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
import {GenericInput1} from '../GenericInput1';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const picture = Image.resolveAssetSource(imagen).uri;

class UserEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            name: null,
            email: null,
            password: null,
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
                this.setState({userSetting: res});
                this.storeData(res).then(r => console.log(r) );
            })
    }

    updateUser = () => {
        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;

        if (name !== null && email !== null && password !== null) {
            axios.put('http://52.0.146.162:80/api/Users?idUser='+this.state.user.UserId+"&email="+email+"name="+name+"&password="+password)
                .then(response =>{
                    alert(response.data);
                    this.getActualUser();
                })
        }else{

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
                            <GenericInput1 placeHolder="Name"/>
                            <GenericInput1 placeHolder="Email"/>
                            <GenericInput1 placeHolder="Pasword"/>
                        </View>
                        <View style={styles.button}>
                            <GenericButton button="Save" press={this.updateUser}/>
                        </View>
                    </ScrollView>
                </View>
            </>
        );
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
