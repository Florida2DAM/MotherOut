import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Icon} from 'react-native-elements';

//Se le pasará un icono de la base de datos, dejo este codigo como ejemplo para otros imports locales
import logo from '../assets/bathroom_icon.png';

const defaultLogo = Image.resolveAssetSource(logo).uri;

export class TaskCard extends Component {

    render() {
        return (
            <>
                <View style={styles.cardTaskbox}>
                    <Image
                        style={styles.logo}
                        source={{uri: defaultLogo}}
                    />
                    <Text style={styles.textStyle}>{this.props.text}</Text>
                    <View style={styles.paddingView}>
                    <Icon
                        name={this.props.icon}
                        type='font-awesome'
                        color='#F4CAE0'
                        onPress={this.props.press}
                        size={42} />
                    </View>
                </View>
            </>
        );
    }

}

const styles = StyleSheet.create({
    cardTaskbox: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        width: 56,
        height: 48,
    },
    paddingView:{
        padding: 5,
    }
});
