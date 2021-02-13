import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import importedPicture from '../../assets/newOrEditTask.png';
import {GenericInput2} from '../GenericInput2';
import {NavBar} from '../NavBar';
import {RoundedButton} from '../RoundedButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
let Image_Header = { uri: 'https://i.imgur.com/QhQFvRY.png?1' };

class NewOrEditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            taskScore: null,
            taskName: null,
            listIcons: [],
            user: [],
            value: null,
        };
    }

    componentDidMount() {
        this.getData();
        this.getIcons();
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser');
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset('User data could not be loaded ', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
        }
    }

    insertTask = async () => {
        if (this.state.taskName === null || this.state.taskName === '') {
            ToastAndroid.showWithGravityAndOffset('piggy, put the field empty', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
        } else {
            let task = {
                TeamId: this.state.user.AsignedTeam,
                TaskScore: this.state.value,
                TaskName: this.state.taskName,
            };

            axios.post('http://52.0.146.162:80/api/UserTasks', task)
                .then(() => {
                    ToastAndroid.showWithGravityAndOffset('your piggy task is send', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
                })
                .catch((e) => {
                    ToastAndroid.showWithGravityAndOffset('the assigment could not be carried out, because you hace entered a non-existent team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
                });
        }
    };

    getIcons = async (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Icons')
            .then(response => {
                this.setState({listIcons: response.data});
            })
            .catch((e) => {
                ToastAndroid.showWithGravityAndOffset('the assigment could not be carried out, because you hace entered a non-existent team', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
            });
    };

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
                        <GenericInput2 value={this.state.taskName}
                                       length={18}
                                       onChange={(item) => this.setState({taskName: item})}/>
                        <Text style={styles.textStyle}>Score</Text>
                        <Slider value={this.state.value} onValueChange={(value => this.setState({value}))}
                                minimumValue={0} maximumValue={30} step={1}
                                trackStyle={{backgroundColor: 'transparent'}}
                                thumbStyle={{backgroundColor: '#D7B9D5'}}/>
                        <View style={{alignItems: 'center', marginTop: 15}}>
                            <Text style={styles.textSlide}>{this.state.value}</Text>
                        </View>
                        <Text style={styles.textStyle}>Icon</Text>
                        <FlatList
                            data={this.state.listIcons}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>
                                <View style={styles.iconBox}>
                                    <Pressable>
                                        <Image
                                            style={{width: 90, height: 90}}
                                            source={item.IconImage}/>
                                    </Pressable>
                                </View>
                            }
                        />

                        <RoundedButton icon="plus" press={this.insertTask}/>
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
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        padding: 10,
        justifyContent: 'space-evenly',
        flex: 10,
    },
    textSlide:{
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: 'white',
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    iconBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center',
    },
});
export default NewOrEditTask;
