import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image, Input } from 'react-native-elements';
import imagen from '../../assets/tasksEditing.png';
import { GenericInput2 } from '../GenericInput2';
import { InputData } from '../InputData';
import { NavBar } from '../NavBar';
import { RoundedButton } from '../RoundedButton';
import { SelectedItem } from '../SelectedItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const picture = Image.resolveAssetSource(imagen).uri;

class TasksEditing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            date: null,
            idTeam: null,
            idTask: null,
            nameTask: null,
            idUser: null,
            selectedIdUser: null,
            teamData: [],
            user: [],
        };
    }

    componentDidMount() {
        this.getData().then(() => {
            this.loadData();
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

    loadData() {
        this.setState({ idTask: this.props.route.params.taskId })
        this.setState({ nameTask: this.props.route.params.taskName })
        this.setState({ idUSer: this.props.route.params.userId })
        this.getIdTeam(this.state.user.UserId);
    }

    getIdTeam(idUser) {
        axios.get('http://52.0.146.162:80/api/Users?idUser=' + idUser).then(response => {
            this.setState({ idTeam: response.data.AsignedTeam });
            this.getUsersByTeam(this.state.idTeam);
        })
            .catch(function (error) {
                alert(error);
            });
    }

    getUsersByTeam(idTeam) {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({ teamData: response.data });
        })
            .catch(function (error) {
                alert(error);
            });
    }

    getName = (item) => {
        this.setState({
            name: item.Name,
            selectedIdUser: item.UserId
        }, () => { console.log(this.state.name), console.log(this.state.date) })
    };

    updateTask = () => {
        axios.put('http://52.0.146.162:80/api/UserTasks?idUserTask=' + 15 + '&fecha=' + "2021-05-05" + '&idUser=' + 1)
            .then(() => {alert("Lanzada peticion") })
            .catch(function (error) {
                alert(error);
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

                    <View style={styles.body}>
                        <Text style={styles.textStyle}>Task name</Text>
                        <GenericInput2 disabled={true} placeHolder={this.state.nameTask} passValue={false} />
                        <Text style={styles.textStyle}>Selected member</Text>
                        <SelectedItem list={this.state.teamData} value={this.state.name} selectedItem={this.getName} />
                        <Text style={styles.textStyle}>Select day</Text>
                        <InputData value={this.state.date}
                            press={(item) => this.setState({ date: item.dateString})} />
                    </View>

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
        alignItems: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Roboto',
        padding: 10,
    },
});

export default TasksEditing;
