import React, {Component} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

export  class GenericIconButton extends Component {

    render() {
        return (
            <View>
                <Pressable onPress={this.props.press}>
                    <View style={styles.buttonView}>
                        <View style={styles.viewIcon}>
                            <Icon name={this.props.icon} type='font-awesome' color='white' size={35}/>
                            <Text style={styles.textButton}>{this.props.button}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    buttonView: {
        justifyContent: "space-evenly",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D7B9D5',
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
        fontWeight: 'bold',
    },
    viewIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
});
