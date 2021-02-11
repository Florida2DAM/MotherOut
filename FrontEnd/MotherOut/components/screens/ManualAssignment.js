import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import { Image } from 'react-native-elements';
import image from '../../assets/manualAssignment.png';
import { InputData } from '../InputData';
import { NavBar } from "../NavBar";
import { RoundedButton } from "../RoundedButton";
import { SelectedItem } from '../SelectedItem';
import { SelectedTask } from '../SelectedTask';

const picture = Image.resolveAssetSource(image).uri;

class ManualAssignment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            date: null,
            task: null,
            idTeam: null,
            idTask: null,
            nameTask: null,
            selectedIdUser: null,
            selectedIdTask: null,
            listUsers: [],
            listTasks: [],
            user: [],
        };
    }

    componentDidMount = () => {
        this.getData().then(() => {
            this.getUsersByTeam(this.state.user.AsignedTeam)
        }).then(() => this.getTaskbyTeam(this.state.user.AsignedTeam));
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
        }
    }

    getTaskbyTeam = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idTeam=' + idTeam)
            .then(response => {
                this.setState({ listTasks: response.data })
            })
            .catch((error) => {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
            });
    }

    getUsersByTeam = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({ listUsers: response.data });
        })
            .catch(function (error) {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
            });
    }

    getName = (item) => {
        this.setState({
            name: item.Name,
            selectedIdUser: item.UserId
        }, () => { console.log(this.state.name), console.log(this.state.date) })
    };

    getTask = (item) => {
        this.setState({
            task: item.TaskName,
            selectedIdTask: item.UserTaskId
        }, () => { console.log(this.state.task) })
    };

    updateTask = async () => {
        axios.put('http://52.0.146.162:80/api/UserTasks?idUserTask=' + this.state.selectedIdTask + '&fecha=' + this.state.date + '&idUser=' + this.state.selectedIdUser)
            .then(() => { ToastAndroid.showWithGravityAndOffset("Lanzada peticion", ToastAndroid.LONG,ToastAndroid.TOP,25,50) })
            .catch(function (error) {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
            });
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 290, height: 90 }}
                            source={{ uri: picture }} />
                    </View>
                    <ScrollView>
                        <View style={styles.body}>
                            <Text style={styles.textStyle}>Task name</Text>
                            <SelectedTask list={this.state.listTasks} value={this.state.task} selectedItem={this.getTask} />
                            <Text style={styles.textStyle}>Selected member</Text>
                            <SelectedItem list={this.state.listUsers} value={this.state.name} selectedItem={this.getName} />
                            <Text style={styles.textStyle}>Select day</Text>
                            <InputData value={this.state.date}
                                press={(item) => this.setState({ date: item.dateString })} />
                        </View>
                    </ScrollView>
                    <View>
                        <RoundedButton icon='check' press={this.updateTask} />
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
        padding: 10,
        flex: 10,
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        padding: 10,
    },
});

export default ManualAssignment;
