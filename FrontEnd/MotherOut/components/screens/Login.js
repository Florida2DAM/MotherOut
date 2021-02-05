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


class Login extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                <ScrollView>
                    <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 50 }}>
                        <Image
                            style={{ width: 270, height: 270 }}
                            source={{ uri: 'https://ep00.epimg.net/elpais/imagenes/2014/10/08/buenavida/1412766626_849373_1412938902_noticia_normal.jpg' }}
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
    contenidor: {
        flex: 1,

        flexDirection: 'column',
        borderColor: 'white',
        alignContent: 'center',
        backgroundColor: '#90A8C3',


    },
    
});

export default Login;
