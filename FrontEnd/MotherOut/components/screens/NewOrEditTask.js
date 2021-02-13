
import React, { Component } from 'react';
import {
    FlatList,
    Pressable, ScrollView, StyleSheet,
    Text, View
} from 'react-native';
import { Image } from 'react-native-elements';
import importAvatar2 from '../../assets/avatar2.png';
import importIcon from '../../assets/bathtub.png';
import importAvatar from '../../assets/circle-cropped.png';
import importedPicture from '../../assets/newOrEditTask.png';
import { GenericInput2 } from '../GenericInput2';
import { NavBar } from '../NavBar';
import { RoundedButton } from '../RoundedButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
let Image_Http_URL = { uri: 'https://i.ibb.co/SVvdmW2/bathtub.png' };
let Image_Header = { uri: 'https://i.imgur.com/QhQFvRY.png?1' };

const picture = Image.resolveAssetSource(importedPicture).uri;


class NewOrEditTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            taskScore: null,
            taskName: null,
            listIcons: [],
            user: [],
        }
    }

    componentDidMount() {
        this.getData();
        this.getIcons();
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            alert(e)
        }
    }

    insertTask = async () => {
        let task = {
            TeamId: this.state.user.AsignedTeam,
            TaskScore: this.state.taskScore,
            TaskName: this.state.taskName
        }

        axios.post('http://52.0.146.162:80/api/UserTasks', task)
            .then(() => {
                alert("Peticion enviada")
            })
            .catch((error) => {
                alert(error);
            });
    }

    getIcons = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Icons')
            .then(response => {
                this.setState({ listIcons: response.data })
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
                            style={{ width: 300, height: 80 }}
                            source={Image_Header} />
                    </View>
                    <View style={styles.body}>

                        <Text style={styles.textStyle}>TaskName</Text>
                        <GenericInput2 value={this.state.taskName} onChange={(item) => this.setState({ taskName: item })} />
                        <Text style={styles.textStyle}>Score</Text>
                        <GenericInput2 value={this.state.taskScore} onChange={(item) => this.setState({ taskScore: item })} />
                        <Text style={styles.textStyle}>Icon</Text>

                        <FlatList
                            data={this.state.listIcons}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.iconBox}>
                                    <Pressable>
                                        <Image
                                            style={{ width: 90, height: 90 }}
                                            source={Image_Http_URL} />
                                    </Pressable>
                                </View>
                            }
                        />

                        <RoundedButton icon="plus" press={this.insertTask} />
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
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        padding: 10,
        justifyContent: 'space-evenly',
        flex: 10,
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    iconBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center'
    },
});
export default NewOrEditTask;
