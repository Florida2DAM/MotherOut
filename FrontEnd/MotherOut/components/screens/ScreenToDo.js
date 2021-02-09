import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/avatar2.png';
import {NavBar} from "../NavBar";
import {TaskCard} from "../TaskCard";
import axios from "axios";

const picture = Image.resolveAssetSource(image).uri;
const data = [
    {
        taskName: 'Clean Bathroom', done: false
    },
    {
        taskName: 'Clean Room', done: true
    },
    {
        taskName: 'Clean Bathroom', done: false
    },
    {
        taskName: 'Clean Bathroom', done: false
    },
    {
        taskName: 'Clean Room', done: true
    },
    {
        taskName: 'Clean Room', done: true
    },
    {
        taskName: 'Clean Bathroom', done: true
    },
    {
        taskName: 'Clean Bathroom', done: true
    }, {
        taskName: 'Clean Bathroom', done: true
    },
    {
        taskName: 'Clean Room', done: false
    },
    {
        taskName: 'Clean Room', done: false
    },
    {
        taskName: 'Clean Room', done: false
    },
];

class ScreenToDo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: null,
            user: [{}],
            team: null,
            done: null,
            undone: null
        }

    }

    getData = (id) => {
        axios.get('http://52.0.146.162:80/api/Users?idUser=' + id)
            .then(response => {
                const res = response.data;
                this.setState({id: res.UserId});
                this.setState({user: response.data});
                this.setState({name: res.Name});
                this.setState({team: res.AsignedTeam});
                this.getTasksByUser(this.state.id, this.state.team);
            })
            .catch((error) => {
                alert(error);
            });
    }

    getTasksByUser = (id, team) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idUser=' + id + '&idTeam=' + team)
            .then(response => {
                let res = [];
                res = response.data;
                res.forEach((item) => {

                    if (item.Done === true) {
                        alert(item.TaskName);
                        this.setState({done: item.TaskName});
                    } else {
                        this.setState({undone: item.TaskName});
                    }
                })

            })
    }

    loadArrayUndone = () => {
        let element = [];
        data.map(item => {
            if (item.done) {
                element.push(item);
            }
        });
        return element;
    }

    loadArrayDone = () => {
        let element = [];
        data.map(item => {
            if (!item.done) {
                element.push(item);
            }
        });
        return element;
    }

    completeTask = (item) => {
    }

    getId = () => {
        alert(this.state.user.Email);
    }


    componentDidMount = () => {
        this.getData(this.props.route.params.userId);
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
                            <Text style={styles.textStyle}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.textStyle}>Pending Tasks</Text>
                        <FlatList data={this.state.done} keyExtractor={((item, index) => index.toString())}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.TaskName} icon={"square-o"}
                                                    press={() => this.completeTask(item)}/>
                                      </View>

                                  }
                        />
                        <Text style={styles.textStyle}>Completed Tasks!</Text>
                        <FlatList data={this.state.undone} keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.TaskName} icon={"check-square-o"}/>
                                      </View>
                                  }
                        />
                    </View>
                    <View>
                        <Button onPress={this.getId} title={"Hostias de paco"}/>
                        <Text>{this.state.id}</Text>
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
