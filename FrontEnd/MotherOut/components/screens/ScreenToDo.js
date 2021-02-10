import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';
import image from '../../assets/avatar2.png';
import { NavBar } from "../NavBar";
import { TaskCard } from "../TaskCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            name: "Animus 58",
            user: [],
        }

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


    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            alert(e)
        }
    }
    componentDidMount = () => {
        this.getData().then(()=>console.log(this.state.user))
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 90, height: 90 }}
                            source={{ uri: picture }} />
                        <View>
                            <Text style={styles.textStyle}>{this.state.name}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.textStyle}>Pending Tasks</Text>
                        <FlatList data={this.loadArrayUndone()} keyExtractor={((item, index) => index.toString())}
                            renderItem={({ item }) =>
                                <View style={styles.paddingView}>
                                    <TaskCard text={item.taskName} icon={"square-o"}
                                        press={() => this.completeTask(item)} />
                                </View>

                            }
                        />
                        <Text style={styles.textStyle}>Completed Tasks!</Text>
                        <FlatList data={this.loadArrayDone()} keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.paddingView}>
                                    <TaskCard text={item.taskName} icon={"check-square-o"} />
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
