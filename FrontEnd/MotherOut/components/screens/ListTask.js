import React, {Component} from 'react';

import {FlatList, StyleSheet, ToastAndroid, View} from 'react-native';

import {Image} from 'react-native-elements';

import imagen from '../../assets/listTask.png';
import {NavBar} from '../NavBar';
import {TaskCard} from '../TaskCard';
import {RoundedButton} from '../RoundedButton';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ReloadedButton} from "../ReloadedButton";
let Image_Http_URL = { uri: 'https://i.imgur.com/M54G2e2.png' };

const picture = Image.resolveAssetSource(imagen).uri;

class ListTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            listTasks: [],
        };
    }

    componentDidMount = () => {
        this.getData().then(() => this.getListTask(this.state.user.AsignedTeam));

    };

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    getListTask = async (id) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idTeam=' + id)
            .then(response => {
                let res;
                let res2 = [];
                res = response.data;
                res.forEach((item) => {
                    res2.push(item);
                });
                this.setState({listTasks: res2});
            }).catch((error)=>{
            ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        })
    }

    deleteTask = async (item) => {
        axios.delete('http://52.0.146.162:80/api/UserTasks?IdTask=' + item.UserTaskId)
            .then(this.getListTask(this.state.user.AsignedTeam), ToastAndroid.showWithGravityAndOffset("The tasks named: " + item.TaskName + " has been deleted. As long as they don't have to work, anything, little pig. ", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50))
            .catch((error) => {
                ToastAndroid.showWithGravityAndOffset(error, ToastAndroid.LONG,
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
                            style={{width: 333, height: 81}}
                            source={Image_Http_URL}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList data={this.state.listTasks}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => (
                                      <View style={{padding: 5}}>
                                          <TaskCard text={item.TaskName} icon={"trash"}
                                                    press={() => this.deleteTask(item)}/>
                                      </View>)}
                        />

                    </View>
                    <View style={styles.buttonsView}>
                        <ReloadedButton
                            press={() => this.getListTask(this.state.user.AsignedTeam)}/>
                        <RoundedButton icon={'plus'} press={() => this.props.navigation.navigate('NewOrEditTask')}/>
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
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

});

export default ListTask;
