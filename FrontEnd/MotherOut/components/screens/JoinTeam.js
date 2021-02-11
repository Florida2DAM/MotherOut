import React, { Component } from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import { Image } from 'react-native-elements';
import imagen from '../../assets/joinTeam.png';
import { GenericInput2 } from '../GenericInput2';
import { NavBar } from '../NavBar';
import { GenericButton } from '../GenericButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const picture = Image.resolveAssetSource(imagen).uri;

class JoinTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idTeam: null,
            user: null,
        };
    }
    componentDidMount = () => {
        this.getData().then(() => { console.log(this.state.user) })
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({ user: JSON.parse(jsonValue) }) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(e, ToastAndroid.LONG,ToastAndroid.TOP,25,50);
        }
    }

    asignTeamToUser = async () => {
        axios.put('http://52.0.146.162:80/api/Teams?idTeam=' + this.state.idTeam + '&idUser=' + this.state.user.UserId)
            .then(() => {   ToastAndroid.showWithGravityAndOffset("you´re part of a pig team", ToastAndroid.LONG,ToastAndroid.TOP,25,50) })
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
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }} />
                    </View>
                    <View style={styles.body}>
                        <GenericInput2 placeHolder="Id Team" value={this.state.idTeam} onChange={(item) => this.setState({ idTeam: item })} />
                        <GenericButton button="Join Team" press={this.asignTeamToUser} />
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
    }
});

export default JoinTeam;
