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


class SingUp extends Component {

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
                            placeholder="Name"
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Email"
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                    </View>
                    <View>
                        <Input
                            placeholder="Pasword"
                            style={styles}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                    </View>
                   
                    <View style={{  marginTop: 90, marginBottom: 10 }} >
                        <Button
                            title="Create Account"
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

export default SingUp;