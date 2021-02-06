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
import logo from '../assets/house_bed_icon-icons.com_74373.png'
const defaultLogo = Image.resolveAssetSource(logo).uri;

export class TaskCardTwoIcons extends Component {
    render() {
        return (
            <>
                <View style={styles.cardTaskbox}>
                    <Image
                        style={styles.logo}
                        source={{ uri: defaultLogo }}
                    />
                    <Text style={styles.textStyle}>{this.props.text}</Text>
                    <View style={styles.icons}>
                        <View style={styles.icon1}>
                            <Icon
                                name={this.props.icon1}
                                type='font-awesome'
                                color='#F4CAE0'
                                onPress={this.props.press}
                                size={42} />
                        </View>
                        <View style={styles.icon2}>
                            <Icon
                                name={this.props.icon2}
                                type='font-awesome'
                                color='#F4CAE0'
                                onPress={this.props.press}
                                size={42} />
                        </View>
                    </View>
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
    icons: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    icon1: {
        padding: 10,
    },
    icon2: {
        padding: 10,
    }

});