import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import {GenericInput3} from '../GenericInput3';
import {NavBar} from '../NavBar';
import {RoundedButton} from '../RoundedButton';
import {RoundedButton2} from '../RoundedButton2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


let Image_Http_URL = {uri: 'https://i.imgur.com/NO6loBM.png?1'};

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
                ToastAndroid.showWithGravityAndOffset("your team is history", ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            } else {
                ToastAndroid.showWithGravityAndOffset("not delete the team", ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            }
        });
    };

    putNameTeam = () => {
        axios.put('http://52.0.146.162:80/api/Teams?idTeam=' + this.state.user.AsignedTeam + '&newTeamName=' + this.state.newNameTeam).then(response => {
            if (response.data == true) {
                alert("Your new name team is changed");
            } else {
                alert("not change your name team");
            }
        });
    };

    createTeam = () => {
        let newTeam = {
            TeamName: this.state.newNameTeam,
        }
        axios.post('http://52.0.146.162:80/api/Teams?&idUser=' + this.state.user.UserId, newTeam).then(response => {
            if (response.data == true) {
                alert("you have a new team");
            } else {
                alert("Don´t have new team");
            }
        })
    };

    deletedTeamUser = (item) => {
        axios.put('http://52.0.146.162:80/api/Users?idUser=' + item.UserId).then(response => {
            if (response.data === true) {
                alert("the fucking " + item.Name + " is history");
            } else {
                alert("No deleted user");
            }
            this.getUserByTeam(item.AsignedTeam);
        })
    };

    renderRoundButton = () => {
        if (!this.state.user.UserMaster) {
            this.setState({
                roundedButton:
                    <RoundedButton icon="plus" press={this.createTeam}/>
            })
        }
    }

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
                    />
            })
        }
    }

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
                                              this.deletedTeamUser(item)
                                          }}>
                                              <Text style={styles.textStyle}>{item.Name}</Text>
                                          </Pressable>
                                      </View>}
                        />
                    </>
            })
        }
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 333, height: 81}}
                            source={Image_Http_URL}/>
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
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: "Roboto",
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
        paddingBottom: 200
    }
});
export default YourTeam;
