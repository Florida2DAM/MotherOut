import React, { Component } from 'react';
import {
    ScrollView, StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/logo.png';
import { GenericButton } from '../GenericButton';
import { GenericInput1 } from '../GenericInput1';

const picture = Image.resolveAssetSource(imagen).uri;

class SingUp extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
                        <View style={styles.pictures}>
                            <Image
                                style={{ width: 310, height: 270 }}
                                source={{ uri: picture }}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <GenericInput1 placeHolder="Name" />
                            <GenericInput1 placeHolder="Email" />
                            <GenericInput1 placeHolder="Pasword" />
                        </View>
                        <View style={styles.button}>
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

export default SingUp;