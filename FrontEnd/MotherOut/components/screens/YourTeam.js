import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, ToastAndroid, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import imagen from '../../assets/yourTeam.jpg';
import {GenericInput3} from '../GenericInput3';
import {NavBar} from '../NavBar';
import {RoundedButton} from '../RoundedButton';
import {RoundedButton2} from '../RoundedButton2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const picture = Image.resolveAssetSource(imagen).uri;

class YourTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            user: [],
            teamData: [],
            nameTeam: null,
            newNameTeam: null,
            roundedButton: null,
            flatList: null,
            navBar: null,
        };
    }

    componentDidMount = () => {
        this.getData().then(
            () => {
                console.log(this.state.user);
                this.getUserByTeam(this.state.user.AsignedTeam);
                this.getTeamName(this.state.user.AsignedTeam);
                this.renderRoundButton();
            });

    };

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser');
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
        }
    };

    getUserByTeam = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({teamData: response.data});
            this.renderFlatList();
            this.renderNavBar();
        })
            .catch(function (error) {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            });
    };

    getTeamName = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Teams?idTeam=' + idTeam).then(response => {
            this.setState({nameTeam: response.data});
        })
            .catch(function (error) {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            });
    };

    deleteTeam = async () => {
        axios.delete('http://52.0.146.162:80/api/Teams?idTeam=' + this.state.user.AsignedTeam).then(response => {
            if (response.data === true) {
                ToastAndroid.showWithGravityAndOffset('your team is history', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            } else {
                ToastAndroid.showWithGravityAndOffset('not delete the team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            }
        });
    };

    putNameTeam = () => {
        axios.put('http://52.0.146.162:80/api/Teams?idTeam=' + this.state.user.AsignedTeam + '&newTeamName=' + this.state.newNameTeam).then(response => {
            if (response.data == true) {
                ToastAndroid.showWithGravityAndOffset('Your new name team is changed', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            } else {
                ToastAndroid.showWithGravityAndOffset('not change your name team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            }
        });
    };

    createTeam = () => {
        if (this.state.newNameTeam === null || this.state.newNameTeam === '') {
            ToastAndroid.showWithGravityAndOffset('piggy, put the field empty', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
        }
        if (this.state.newNameTeam.length < 3) {
            ToastAndroid.showWithGravityAndOffset('piggy, your team must be much more big', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
        } else {
            let newTeam = {
                TeamName: this.state.newNameTeam,
            };
            axios.post('http://52.0.146.162:80/api/Teams?&idUser=' + this.state.user.UserId, newTeam).then(response => {
                if (response.data !== true) {
                    this.getActualUser();
                    ToastAndroid.showWithGravityAndOffset('piggy, you have a new pig team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
                    this.props.navigation.navigate('ScreenToDo');
                } else {
                    ToastAndroid.showWithGravityAndOffset('fuck off!! impossible to do a new team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
                }
            });
        }

    };

    getActualUser = async () => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + this.state.user.Email)
            .then(response => {
                const res = response.data;
                this.setState({user: res});
                this.storeData(res).then(r => console.log(r));

            }).catch((error) => {
            ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        });
    };

    async storeData(res) {
        try {
            const jsonValue = JSON.stringify(res);
            await AsyncStorage.setItem('logUser', jsonValue);
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    deletedTeamUser = (item) => {
        axios.put('http://52.0.146.162:80/api/Users?idUser=' + item.UserId).then(response => {
            if (response.data === true) {
                ToastAndroid.showWithGravityAndOffset('the fucking ' + item.Name + ' is history', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            } else {
                ToastAndroid.showWithGravityAndOffset('No deleted user', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            }
            this.getUserByTeam(item.AsignedTeam);
        });
    };

    renderRoundButton = () => {
        if (!this.state.user.UserMaster) {
            this.setState({
                roundedButton:
                    <RoundedButton icon="plus" press={this.createTeam}/>,
            });
        }
    };

    renderNavBar = () => {
        if (this.state.user.UserMaster) {
            this.setState({
                navBar:
                    <NavBar
                        checked={() => this.props.navigation.navigate('ScreenToDo')}
                        list={() => this.props.navigation.navigate('ListTask')}
                        calendar={() => this.props.navigation.navigate('TaskAssignment')}
                        nav={() => this.props.navigation.navigate('Statistics')}
                        settings={() => this.props.navigation.navigate('Setting')}
                    />,
            });
        }
    };

    renderFlatList = () => {
        if (this.state.user.UserMaster) {
            this.setState({
                flatList:
                    <>
                        <Text style={styles.text}>Members</Text>
                        <FlatList data={this.state.teamData}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.userBox}>
                                          <Pressable onLongPress={() => {
                                              this.deletedTeamUser(item);
                                          }}>
                                              <Text style={styles.textStyle}>{item.Name}</Text>
                                          </Pressable>
                                      </View>}
                        />
                    </>,
            });
        }
    };

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 310, height: 90}}
                            source={{uri: picture}}/>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.garbage}>
                            <Text style={styles.text}>Group name</Text>
                            <View style={styles.icons}>
                                <RoundedButton2 icon={'edit'} press={this.putNameTeam}/>
                                <RoundedButton2 icon={'trash'} press={this.deleteTeam}/>
                            </View>
                        </View>
                        <GenericInput3 placeHolder={this.state.nameTeam} value={this.state.newNameTeam}
                                       onChange={(item) => this.setState({newNameTeam: item})}/>
                        {this.state.flatList}
                        <Text style={styles.text}>Your id team is: {this.state.user.AsignedTeam}</Text>
                    </View>
                    <View style={styles.button}>
                        {this.state.roundedButton}
                    </View>
                    <View>
                        {this.state.navBar}
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
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    body: {
        marginTop: 10,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
        marginBottom: -100,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto',
        padding: 10,
    },
    garbage: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    userBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center',
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    icons: {
        flexDirection: 'row',
    },
    button: {
        paddingBottom: 200,
    },
});
export default YourTeam;
