import React, {Component} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';


export default class RoundedButton extends Component {

    render() {

        return (
            <View>
                <View style={styles.buttonView}>
                    <Icon raised reverse name='plus' type='font-awesome' color='#D7B9D5' size={35}
                          onPress={this.props.press} style={styles.shadow}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    buttonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },

    textButton: {
        fontSize: 23,
        fontFamily: 'Roboto',
        color: 'white',
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});
