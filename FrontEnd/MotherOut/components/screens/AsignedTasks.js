import React, {Component} from 'react';
import {FlatList, StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import {NavBar} from '../NavBar';
import {TaskCardTwoIcons} from '../TaskCardTwoIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let Image_Http_URL = {uri: 'https://i.imgur.com/t9OAsHQ.png'};

class AsignedTasks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: null,
            taskTeam: [],
            user: [],
            asignedTeam: null,
        }
    }

    componentDidMount() {
        this.getData().then(
            () => {
                console.log(this.state.user);
                this.getTaskbyTeam(this.state.user.AsignedTeam);
            })
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

    getTaskbyTeam = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idTeam=' + idTeam)
            .then(response => {
                this.setState({taskUsers: response.data})
            })
            .catch(() => {
                ToastAndroid.showWithGravityAndOffset("It has not been possible to obtain information on the tasks per team.", ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50);
            });
    }

    taskEditing = (item) => {
        this.props.navigation.navigate('TasksEditing', {
            taskId: item.UserTaskId,
            userId: item.UserId,
            taskName: item.TaskName
        })
    }

    deleteTask = async (item) => {
        axios.delete('http://52.0.146.162:80/api/UserTasks?IdTask=' + item.UserTaskId)
            .then((error) => {
                this.getTaskbyTeam(this.state.user.AsignedTeam)
            })
            .catch(() => {
                ToastAndroid.showWithGravityAndOffset("The task could not be deleted due to network error.", ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50);
            });
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 351, height: 91}}
                            source={Image_Http_URL}/>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.taskUsers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <View style={styles.flatStyle}>
                                    <TaskCardTwoIcons
                                        task={item.TaskName}
                                        name={item.SelectMember}
                                        icon1="trash"
                                        icon2="edit"
                                        iconCard={item.TaskIcon}
                                        press1={() => this.deleteTask(item)}
                                        press2={() => this.taskEditing(item)}
                                    />
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
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    logo: {
        width: 66,
        height: 58,
    },
    headUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    flatStyle: {
        padding: 5
    }
});

export default AsignedTasks;
