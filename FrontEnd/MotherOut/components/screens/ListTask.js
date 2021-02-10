import React, {Component} from 'react';

import {FlatList, StyleSheet, View} from 'react-native';

import {Image} from 'react-native-elements';

import imagen from '../../assets/listTask.png';
import {NavBar} from '../NavBar';
import {TaskCard} from '../TaskCard';
import {RoundedButton} from '../RoundedButton';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const picture = Image.resolveAssetSource(imagen).uri;

class ListTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userId: null,
            listTasks: [],
        };
    }

    componentDidMount = () => {
        this.setState({user: this.props.route.params.user}, () =>{
            console.log(this.state.user);
            this.getListTask(this.state.user.AsignedTeam);
        });

    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            alert(e)
        }
    }

    getListTask = (id) => {
        axios.get('http://52.0.146.162:80/api/UserTasks?idTeam='+id)
            .then(response => {
                let res;
                let res2 = [];
                res = response.data;
                res.forEach((item) => {
                    res2.push(item);
                });
                this.setState({listTasks: res2});
            })
    }


    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList data={this.state.listTasks}
                                  keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) => (
                                      <View style={{padding: 5}}>
                                          <TaskCard text={item.TaskName} icon={"trash"}/>
                                      </View>)}
                        />
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

});

export default ListTask;
