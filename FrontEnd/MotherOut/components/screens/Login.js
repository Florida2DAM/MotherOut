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
                        <Input
                            placeholder="Login"
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Password"
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                    </View>
                    <View style={{  marginTop: 20, marginBottom: 30 }} >
                        <Button
                            title="Log In"
                        />
                    </View>
                    <View style={{ alignSelf: 'center',}}>
                        <Text>Don't have a login?</Text>
                    </View>
                    <View style={{  marginTop: 20, marginBottom: 30 }} >
                        <Button
                            title="Sign Up"
                        />
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

    pictures:{
        alignSelf: 'center',
         marginTop: 30, 
         marginBottom: 10 
    }
    
});

export default Login;
