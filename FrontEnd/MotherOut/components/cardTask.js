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
import logo1 from '../assets/house_bed_icon-icons.com_74373.png'
const defaultLogo = Image.resolveAssetSource(logo1).uri;

export class CardTaskbox extends Component {

    render() {
        return (
            <>
                <View style={styles.cardTaskbox}>
                    <Image
                        style={styles.logo}
                        source={{uri: defaultLogo}}
                    />
                    <Text style={styles.textStyle}>{this.props.text}</Text>
                    <Icon
                        name={this.props.name}
                        type='font-awesome'
                        color='#F4CAE0'
                        onPress={this.props.press} 
                        size={50}/>
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
        borderColor: "#64A6BD"
    },
    textStyle: {
        padding:10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight:"bold"
    },
    logo: {
        width: 66,
        height: 58,
      },
});