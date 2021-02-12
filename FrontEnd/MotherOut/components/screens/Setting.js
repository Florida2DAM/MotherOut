import React, {Component} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import imagen from '../../assets/setting.png';
import {GenericIconButton} from '../GenericIconButton';
import {NavBar} from '../NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const picture = Image.resolveAssetSource(imagen).uri;

class Setting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
        }

    }

    componentDidMount = () => {
        this.getData().then(() => console.log(this.state.user));
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be loaded.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    checkMaster = () => {
        if (this.state.user.UserMaster === true) {
            this.props.navigation.navigate('YourTeam');
        } else {
            ToastAndroid.showWithGravityAndOffset("You are not a master user and therefore cannot navigate to the YourTeam.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    };

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
                        <View style={styles.header}>
                            <View style={styles.pictures}>
                                <Image
                                    style={{width: 300, height: 90}}
                                    source={{uri: picture}}
                                />
                            </View>
                        </View>
                        <View style={styles.body}>
                            <GenericIconButton
                                button="Your Team"
                                icon='users'
                                press={() => this.checkMaster()}
                            />
                            <GenericIconButton
                                button="Global settings"
                                icon='cogs'
                                press={() => this.props.navigation.navigate('GlobalSettings')}
                            />
                            <GenericIconButton
                                button="User edit"
                                icon='edit'
                                press={() => this.props.navigation.navigate('UserEdit')}
                            />
                        </View>
                    </ScrollView>
                    <NavBar
                        checked={() => this.props.navigation.navigate('ScreenToDo')}
                        list={() => this.props.navigation.navigate('ListTask')}
                        calendar={() => this.props.navigation.navigate('TaskAssignment')}
                        nav={() => this.props.navigation.navigate('Statistics')}
                        settings={() => this.props.navigation.navigate('Setting')}
                    />
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
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    }
});

export default Setting;
