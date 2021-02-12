import React, {Component} from 'react';
import {
    ScrollView, StyleSheet,
    View, Text, Linking, ToastAndroid
} from 'react-native';
import {
    Image,
} from 'react-native-elements';
import imagen from '../../assets/logo.png';
import {GenericButton} from '../GenericButton';
import {GenericInput1} from '../GenericInput1';
import {CheckBox} from 'react-native-elements'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const picture = Image.resolveAssetSource(imagen).uri;

class SingUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            name: null,
            email: null,
            password: null,
        };
    }

    async storeData(res) {
        try {
            const jsonValue = JSON.stringify(res);
            await AsyncStorage.setItem('logUser', jsonValue);
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be stored.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    //no me queda claro
    componentWillUnmount() {
        this.setState({name: null})
        this.setState({email: null})
        this.setState({password: null})
    }

    addUser = async () => {
        let user = {
            Name: this.state.name,
            Email: this.state.email,
            Password: this.state.password,
            Help: true,
        };

        if (this.state.email === '' || this.state.email === null
        ) {
            ToastAndroid.showWithGravityAndOffset("El email está vacío.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);

        } else if (this.state.name === null || this.state.name === '') {
            ToastAndroid.showWithGravityAndOffset("El nombre está vacío.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        } else if (this.state.password === null || this.state.password === '') {
            ToastAndroid.showWithGravityAndOffset("La contraseña está vacía", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        } else if (!this.state.email.endsWith("@*")) {
            ToastAndroid.showWithGravityAndOffset("Debes de introducir una extensión válida de email", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        } else {
            if (this.state.checked) {
                axios.post('http://52.0.146.162:80/api/Users', user)
                    .then(() => {
                        this.getUserbyEmail(this.state.email);
                        ToastAndroid.showWithGravityAndOffset("It has been successfully registered. You will now be able to join a herd pigs.", ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            25,
                            50)
                    })
                    .catch(() => {
                        ToastAndroid.showWithGravityAndOffset("Registration could not be completed.", ToastAndroid.LONG,
                            ToastAndroid.TOP,
                            25,
                            50);
                    });
                this.props.navigation.navigate('Help1');
            } else {
                ToastAndroid.showWithGravityAndOffset("You must agree to the terms in order to sell them, little piggy.", ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50);
            }
        }
    };

    getUserbyEmail = (email) => {
        axios.get('http://52.0.146.162:80/api/Users?email=' + email)
            .then(response => {
                const res = response.data;
                this.setState({user: res});
                this.storeData(res);
            })
            .catch(() => {
                ToastAndroid.showWithGravityAndOffset("The email already exists, you cannot enter this email.", ToastAndroid.LONG,
                    ToastAndroid.TOP,
                    25,
                    50);
            });
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
                            <GenericInput1 placeHolder="Name" value={this.state.name}
                                           onChange={(item) => this.setState({name: item})}/>
                            <GenericInput1 placeHolder="Email" value={this.state.email}
                                           onChange={(item) => this.setState({email: item})}/>
                            <GenericInput1 placeHolder="Pasword" value={this.state.passwordl} passValue={true}
                                           onChange={(item) => this.setState({password: item})}/>
                            <CheckBox
                                containerStyle={styles.check}
                                checkedIcon={'check-square'}
                                uncheckedIcon={'square'}
                                checked={this.state.checked}
                                onPress={() => this.setState({checked: !this.state.checked})}
                                title={
                                    <Text style={styles.textCheck}
                                          onPress={() => Linking.openURL('https://www.boe.es/eli/es/lo/2018/12/05/3/con')}>
                                        Aceptar términos y condiciones
                                    </Text>}
                            />
                        </View>
                        <View style={styles.button}>
                            <GenericButton button="Create Account" press={this.addUser}/>
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
    },
    check: {
        borderColor: '#D7B9D5',
        alignSelf: 'center',
        backgroundColor: '#90A8C3',
    },
    textCheck: {
        color: 'blue',
    },
});

export default SingUp;
