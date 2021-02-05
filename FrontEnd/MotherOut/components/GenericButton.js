import React, {Component} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export default class GenericButton extends Component {

    render() {
        return (
            <View>
                <Pressable onPress={this.props.press}>
                    <View style={styles.buttonView}>
                        <Text style={styles.textButton}>{this.props.button}</Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    buttonView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        backgroundColor: '#D7B9D5',
        alignItems: 'center',
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },

    textButton: {
        fontSize: 23,
        fontFamily: 'Roboto',
        color: 'white',
        fontWeight:"bold"
    },
});
