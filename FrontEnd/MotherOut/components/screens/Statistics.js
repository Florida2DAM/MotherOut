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
    Text,

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

import imagen from '../../assets/statistics.png'

const picture = Image.resolveAssetSource(imagen).uri;

class Statistics extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.secction1}>
                        <View style={styles.pictures}>
                            <Image
                                style={{ width: 300, height: 90 }}
                                source={{ uri: picture }}
                            />
                        </View>
                    </View>
                    <View style={styles.secction2}>
                        
                    </View>
                    <View style={styles.secction3}>
                        <View>
                            <Text>HOLA</Text>
                        </View>
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
        borderColor: 'white',
        alignContent: 'center',
        backgroundColor: '#90A8C3',


    },

    secction1: {
        flex: 2,
        flexDirection: 'column',
        borderWidth: 3,
        borderColor: 'black',

    },
    secction2: {
        flex: 10,
        borderWidth: 3,
        flexDirection: 'column',
        borderColor: 'black',


    },
    secction3: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 3,
        borderColor: 'black',


    },

    StyleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10,

    },
    box: {

        borderRadius: 3,
        backgroundColor: '#D7B9D5',
        marginLeft: 27

    },
    pictures: {
        alignSelf: 'center',
        padding:5,
    }



});

export default Statistics;