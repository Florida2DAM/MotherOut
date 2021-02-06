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


import imagen from '../../assets/logo.png'
import { GenericInput1 } from '../GenericInput1';
import { GenericButton } from '../GenericButton';

const picture = Image.resolveAssetSource(imagen).uri;


class SingUp extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>

                    <View style={styles.pictures}>
                        <Image
                            style={{ width: 310, height: 270 }}
                            source={{ uri: picture }}
                        />
                    </View>
                    <ScrollView>
                        <View>
                            <GenericInput1 placeHolder="Name" />

                            <GenericInput1 placeHolder="Email" />

                            <GenericInput1 placeHolder="Pasword" />

                            <GenericButton button="Create Account" />

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
    pictures: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10
    },
});

export default SingUp;