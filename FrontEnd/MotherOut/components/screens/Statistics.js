import React, {Component} from 'react';
import {FlatList, StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import imagen from '../../assets/statistics.png';
import {NavBar} from '../NavBar';
import {StatisticCard} from '../StatisticCard';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const picture = Image.resolveAssetSource(imagen).uri;

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTeam: null,
            teamData: [],
            teamUserData: [],
            user: [],
        };
    }

    componentDidMount() {
        this.getData().then(
            () => {
                console.log(this.state.user);
                this.getUserByTeam(this.state.user.AsignedTeam);
            });

    }

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

    getUserByTeam = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({teamData: response.data});
        }).catch(function (error) {
            ToastAndroid.showWithGravityAndOffset("It has not been possible to obtain the user per team.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        });
    };

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList data={this.state.teamData}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => (
                                      <View style={{padding: 10}}>
                                          <StatisticCard user={item.Name} quantity={item.NTaks}
                                                         score={item.UserScore}/>
                                      </View>)}
                        />
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
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
    },
});

export default Statistics;
