import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/testAvatar.png';
import {NavBar} from "../NavBar";
import {TaskCard} from "../TaskCard";

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
    },{
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
        }

    }

    loadArray1 = () => {
        let element = [];
        data.map(item => {
            if (item.done) {
                element.push(item);
            }
        });
        return element;
    }

    loadArray2 = () => {
        let element = [];
        data.map(item => {
            if (!item.done) {
                element.push(item);
            }
        });
        return element;
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
                        <FlatList data={this.loadArray2()} keyExtractor={((item, index) => index.toString())}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.taskName} icon={"square-o"}/>
                                      </View>

                                  }
                        />
                        <Text style={styles.textStyle}>Completed Tasks!</Text>
                        <FlatList data={this.loadArray1()} keyExtractor={(item, index) => index.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.paddingView}>
                                          <TaskCard text={item.taskName} icon={"check-square-o"}/>
                                      </View>
                                  }
                        />
                    </View>
                    <View>
                        <NavBar/>
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
    paddingView:{
        padding: 5,
    }
});

export default ScreenToDo;
