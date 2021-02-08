import axios from 'axios';
import React, { Component } from 'react';
import {
    ScrollView, StyleSheet,
    Text, View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/logo.png';
import { GenericButton } from '../GenericButton';
import { GenericInput1 } from '../GenericInput1';

const picture = Image.resolveAssetSource(imagen).uri;

/*const instance = axios.create({
    baseURL: 'https://localhost:44397/api',
    timeout: 1000,
    headers: {'content-type': 'application/json'}
  });*/

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            persons : null,
        }
    }

    componentDidMount(){
    
    }

    getUserbyEmail = () => {
        axios.get('https://localhost:44397/api/Users?email=Memem@gmail.com')
            .then(response => {
                alert("Hola" + response.data)
            })
            .catch(function (error) {
                alert("meh")
                alert(error);
            });
        //this.props.navigation.navigate('ScreenToDo')
    }
    render() {
        return (
            <>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.pictures}>
                            <Image
                                style={{ width: 310, height: 270 }}
                                source={{ uri: picture }}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <GenericInput1 placeHolder="Email" value={this.state.email}
                                onChange={(item) => this.setState({ email: item })} />
                            <GenericInput1 placeHolder="Password" />
                        </View>
                        <View style={styles.buttons} >
                            <GenericButton button="Log In" press={this.getUserbyEmail} />
                            <View style={styles.text}>
                                <Text>Don't have a login?</Text>
                            </View>
                            <GenericButton button="Sing Up" press={() => this.props.navigation.navigate('SingUp')} />
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90A8C3',
    },
    pictures: {
        alignSelf: 'center',
        padding: 15,
        marginTop: 15,
    },
    inputs: {
        padding: 15,
    },
    buttons: {
        alignContent: 'center',
        padding: 15,
    },
    text: {
        alignSelf: 'center',
        paddingTop: 20,
    }
});

export default Login;
