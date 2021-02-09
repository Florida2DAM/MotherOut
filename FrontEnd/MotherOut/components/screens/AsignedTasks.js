import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import importedPicture from '../../assets/asignedTasks.png';
import importAvatar2 from '../../assets/avatar2.png';
import importIcon from '../../assets/bathtub.png';
import importAvatar from '../../assets/circle-cropped.png';
import { NavBar } from '../NavBar';
import { TaskCardTwoIcons } from '../TaskCardTwoIcons';
import axios from 'axios';

const avatar = Image.resolveAssetSource(importAvatar).uri
const avatar2 = Image.resolveAssetSource(importAvatar2).uri
const icon = Image.resolveAssetSource(importIcon).uri
const picture = Image.resolveAssetSource(importedPicture).uri;


const taskList = [
    { task: "Clean Bathroom", blop: icon },
    { task: "Clean Bathroom", blop: icon },
    { task: "Clean Bathroom", blop: icon },
    { task: "Clean Bathroom", blop: icon },
];

const listUsers = [
    { name: 'Pablo', blop: avatar2 }, { name: 'Juan', blop: avatar }, { name: 'Jesus', blop: avatar }
]

class AsignedTasks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task: null,
            listUsers: [],
            taskUsers: []
        }
    }

    setData = (id) => {
        //Pasar por parametro el id del usu importado
        axios.get('http://52.0.146.162:80/api/Users?idUser=' + id)
            .then(response => {
                const res = response.data;
                this.getTeamUser(res.AsignedTeam)
                this.getTaskUserTeam(res.AsignedTeam, res.UserId)
            })
            .catch((error) => {
                alert(error);
            });
    }

    getTeamUser = (id) => {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + id)
            .then(response => {
                this.setState({ listUsers: response.data })
            })
            .catch((error) => {
                alert(error);
            });
    }

    getTaskUserTeam = (idTeam, idUser) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idUser=' + idTeam + '&idTeam=' + idUser)
            .then(response => {
                this.setState({ taskUsers: response.data })
            })
            .catch((error) => {
                alert(error);
            });
    }

    componentDidMount() {
        this.setData(1) //User el param aquí 
    }

    getTask = (itemSelected) => {
        return alert(itemSelected)
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
                            data={this.state.listUsers}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={styles.headUser}>
                                        <Text style={styles.textStyle}>{item.Name}</Text>
                                        <Image
                                            style={styles.logo}
                                            source={{ uri: item.blop }}
                                        />
                                    </View>
                                    <FlatList
                                        data={this.state.taskUsers}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) =>
                                            <View style={styles.flatStyle}>
                                                <TaskCardTwoIcons text={item.TaskName}
                                                    icon1="trash"
                                                    icon2="edit"
                                                    iconCard={item.blop} />
                                            </View>
                                        }
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
