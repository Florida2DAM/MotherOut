import React, {Component} from 'react';
import {
    ScrollView, StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/logo.png';
import {GenericButton} from '../GenericButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {NavBar} from "../NavBar";
import {GenericInput2} from "../GenericInput2";

const picture = Image.resolveAssetSource(imagen).uri;

class UserEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            name: null,
            email: null,
            password: null,
            ppww: null,
        }
    }

    componentDidMount = () => {
        this.getData().then(() => {
            this.getActualUser();
        });
    }

    async storeData(res) {
        try {
            const jsonValue = JSON.stringify(res)
            await AsyncStorage.setItem('logUser', jsonValue)
        } catch (e) {
            alert(e)
        }
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            alert(e)
        }
    }

    getActualUser = () => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + this.state.user.Email)
            .then(response => {
                const res = response.data;
                this.setState({user: res});
                this.storeData(res).then(r => console.log(r));

            })
    }

    updateUser = () => {
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        if (name === null) {
            name = this.state.user.UserId;
        }

        if (email === null) {
            email = this.state.user.Email;
        }

        if (password === null) {
            password = this.state.user.Password;
        }

        if (name === this.state.user.Name && email === this.state.user.Email && password === this.state.user.Password) {
            alert("No hace falta que actualicemos nada, porque está todo igual");
        } else {
            axios.put('http://52.0.146.162:80/api/Users?idUser='+this.state.user.UserId+'&email='+email+'&name='+name+'&password='+password)
                .then(response => {
                    alert(response.data);
                    this.getActualUser();
                })
        }
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 310, height: 270}}
                                source={{uri: picture}}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <GenericInput2 placeHolder={this.state.user.Name} value={this.state.name}
                                           onChange={(item) => this.setState({name: item})}/>
                            <GenericInput2 placeHolder={this.state.user.Email} value={this.state.email}
                                           onChange={(item) => this.setState({email: item})}/>
                            <GenericInput2 placeHolder="*********" passValue={true} value={this.state.password}
                                           onChange={(item) => this.setState({password: item})}/>
                        </View>
                        <View style={styles.button}>
                            <GenericButton button="Save" press={this.updateUser}/>
                        </View>
                    </ScrollView>
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
        )
            ;
    }
}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,
        alignContent: 'center',
        paddingTop: 25,
        backgroundColor: '#90A8C3',
    },
    pictures: {
        alignSelf: 'center',
    },
    inputs: {
        padding: 10,
        paddingTop: 20,
    },
    button: {
        padding: 15,
    }
});

export default UserEdit;
