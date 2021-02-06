import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {
    Icon,
} from "react-native-elements"

//Se le pasará un icono de la base de datos, dejo este codigo como ejemplo para otros imports locales
import logo from '../assets/avatar2.png'
const defaultLogo = Image.resolveAssetSource(logo).uri;

export class TaskCard extends Component {

    render() {
        return (
            <>
                <View style={styles.cardTaskbox}>
                    <Image
                        style={styles.logo}
                        source={{ uri: defaultLogo }}
                    />
                    <Text style={styles.textStyle}>{this.props.text}</Text>
                    <Icon
                        name={this.props.icon}
                        type='font-awesome'
                        color='#F4CAE0'
                        onPress={this.props.press}
                        size={50} />
                </View>
            </>
        );
    }

}

const styles = StyleSheet.create({
    cardTaskbox: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#ADA7C9",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#64A6BD",
        //Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    logo: {
        width: 66,
        height: 58,
    },
});