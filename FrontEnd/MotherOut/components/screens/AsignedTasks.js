import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import importedPicture from '../../assets/asignedTasks.png';
import { NavBar } from '../NavBar';
import { TaskCardTwoIcons } from '../TaskCardTwoIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const picture = Image.resolveAssetSource(importedPicture).uri;

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
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            alert(e)
        }
    }

    getTaskbyTeam = (idTeam) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idTeam=' + idTeam)
            .then(response => {
                this.setState({ taskUsers: response.data })
            })
            .catch((error) => {
                alert(error);
            });
    }

    taskEditing = (item) => {
        this.props.navigation.navigate('TasksEditing', {
            taskId: item.UserTaskId,
            userId: item.UserId,
            taskName: item.TaskName
        })
    }

    deleteTask = (item) => {
        axios.delete('http://52.0.146.162:80/api/UserTasks?IdTask=' + item.UserTaskId)
            .then((error) => {
                this.getTaskbyTeam(this.state.user.AsignedTeam)
            })
            .catch((error) => {
                alert(error);
            });
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }} />
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.taskUsers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.flatStyle}>
                                    <TaskCardTwoIcons
                                        task={item.TaskName}
                                        name={item.SelectMember}
                                        icon1="trash"
                                        icon2="edit"
                                        iconCard={item.blop}
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
