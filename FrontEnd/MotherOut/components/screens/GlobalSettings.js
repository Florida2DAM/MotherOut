import React, {Component} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import {NavBar} from '../NavBar';
import {GenericIconButton} from '../GenericIconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let Image_Http_URL = {uri: 'https://i.imgur.com/uCqVyr4.png?1'};

class GlobalSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: null,
            user: null,
            userSetting: null,
        };
    }

    loadHelp = () => {
        if (!this.state.userSetting.Help) {
            this.setState({icon: 'toggle-off'});
        } else {
            this.setState({icon: 'toggle-on'});
        }
    };

    getActualUser = async () => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + this.state.user.Email)
            .then(response => {
                const res = response.data;
                this.setState({userSetting: res});
                this.loadHelp();
            }).catch(() => {
            ToastAndroid.showWithGravityAndOffset("The user could not be obtained.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        })
    }

    enabledOrDisabledHelp = async () => {
        if (this.state.userSetting.Help) {
            axios.put('http://52.0.146.162:80/api/Users?idUser=' + this.state.userSetting.UserId + '&help=' + false)
                .then(() => {
                    ToastAndroid.showWithGravityAndOffset("Well, you don't need our help any more. God, I'm so glad I don't have to work any more...", ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50);
                    this.getActualUser();
                })
                .catch(() => {
                    ToastAndroid.showWithGravityAndOffset("The help could not be deactivated.", ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50);
                });
        } else {
            axios.put('http://52.0.146.162:80/api/Users?idUser=' + this.state.userSetting.UserId + '&help=' + true)
                .then(() => {
                    ToastAndroid.showWithGravityAndOffset("The aid has been discharged. Little piggy.", ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50);

                    this.getActualUser();
                })
                .catch(() => {
                    ToastAndroid.showWithGravityAndOffset("The help could not be deactivated.", ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50);
                });
        }

    };

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser');
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be loaded.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    componentDidMount = () => {
        this.getData().then(() => {
            this.getActualUser();
        });
    };

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 375, height: 99}}
                            source={Image_Http_URL}/>
                    </View>
                    <View style={styles.body}>
                        <GenericIconButton press={this.enabledOrDisabledHelp} icon={this.state.icon}
                                           button={'Show Help'}/>
                    </View>
                    <View>
                        <NavBar
                            checked={() => this.props.navigation.navigate('ScreenToDo')}
                            list={() => this.props.navigation.navigate('ListTask')}
                            calendar={() => this.props.navigation.navigate('TaskAssignment')}
                            nav={() => this.props.navigation.navigate('Statistics')}
                            settings={() => this.props.navigation.navigate('Setting')}
                        />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#90A8C3',
        borderWidth: 2,
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
        borderTopColor: 'grey',
        borderBottomColor: '#90A8C3',
        borderRightColor: '#90A8C3',
        borderLeftColor: '#90A8C3',
        borderWidth: 1,
    },
});

export default GlobalSettings;
