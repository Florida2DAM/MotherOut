/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,

    LogBox,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
    Image,
    Input,
} from 'react-native-elements';
import imagen from '../../assets/logo.png'
import { GenericInput1 } from '../GenericInput1';
import { GenericButton } from '../GenericButton';

const picture = Image.resolveAssetSource(imagen).uri;


class Login extends Component {

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
                    
                        <View>
                            <GenericInput1 placeHolder="Login" />
                        </View>
                        <View>
                            <GenericInput1 placeHolder="Password" />
                        </View>
                        <View style={styles.button1} >
                            <GenericButton button="Log In" />
                        </View>
                        <View style={styles.text}>
                            <Text>Don't have a login?</Text>
                        </View>
                        <View style={styles.button2} >
                            <GenericButton button="Sing Up" />
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
        flexDirection: 'column',
        borderColor: 'white',
        alignContent: 'center',
        backgroundColor: '#90A8C3',
    },

    pictures: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    button1: {
        padding: 1,
    },
    button2: {
        padding: 2,

    },
    text: {
        alignSelf: 'center',
        marginTop: 20,
    }

});

export default Login;
