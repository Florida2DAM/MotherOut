import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/avatar2.png';
import {NavBar} from "../NavBar";
import {TaskCard} from "../TaskCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const picture = Image.resolveAssetSource(image).uri;

class ScreenToDo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            done: [],
            undone: []
        }

    }

    getTasksByUser = (id, team) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idUser=' + id + '&idTeam=' + team)
            .then(response => {
                let res;
                let res2 = [];
                let res3 = []
                res = response.data;
                res.forEach((item) => {
                    if (item.Done) {
                        res2.push(item);
                    } else {
                        res3.push(item);
                    }
                });
                this.setState({done: res2});
                this.setState({undone: res3});
            })
    }

    completeTask = (item) => {
        let userId = item.UserId;
        let userTaskId = item.UserTaskId;
        let userIdTeam = item.TeamId;
        axios.put('http://52.0.146.162:80/api/Users?idUser=' + userId + '&idTask=' + userTaskId + '&done=' + true)
            .then(this.getTasksByUser(userId, userIdTeam))
            .catch((error) => {
                alert(error);
            })

    }

    uncheckTaskCompleted = (item) => {
        let userId = item.UserId;
        let userTaskId = item.UserTaskId;
        let userIdTeam = item.TeamId;
        axios.put('http://52.0.146.162:80/api/Users?idUser=' + userId + '&idTask=' + userTaskId + '&done=' + false)
            .then(this.getTasksByUser(userId, userIdTeam))
            .catch((error) => {
                alert(error);
            })

    }

    componentDidMount = () => {
        this.getData().then(() => this.getTasksByUser(this.state.user.UserId, this.state.user.AsignedTeam));
    }

    /*componentDidUpdate = () => {
        this.getData().then(() => this.getTasksByUser(this.state.user.UserId, this.state.user.AsignedTeam));

    }*/

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            alert(e)
        }
    }


    render() {

        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 90, height: 90}}
                            source={{uri: picture}}/>
                        <View>
                            <Text style={styles.textStyle}>{this.state.user.Name}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.textStyle}>Pending Tasks</Text>
                        <FlatList data={this.state.undone} keyExtractor={((item, index) => index.toString())}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.TaskName} icon={"square-o"}
                                                    press={() => this.completeTask(item)}/>
                                      </View>

                                  }
                        />
                        <Text style={styles.textStyle}>Completed Tasks!</Text>
                        <FlatList data={this.state.done} keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.TaskName} icon={"check-square-o"}
                                                    press={() => this.uncheckTaskCompleted(item)}/>
                                      </View>
                                  }
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
        justifyContent: 'space-evenly',
        alignItems: "center",
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
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        padding: 15,
    },
    paddingView: {
        padding: 5,
    }
});

export default ScreenToDo;
