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
const  importIcon = 'https://imgur.com/XxFhTjv.png'


export class TaskCardTwoIcons extends Component {
    render() {
        return (
            <>
                <View style={styles.cardTaskbox}>
                    <View style={styles.image}>
                        <Image
                            style={styles.logo}
                            source={{ uri: this.props.iconCard }}
                        />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.textStyle}>{this.props.task}</Text>
                        <Image
                            style={styles.asignedIcon}
                            source={{ uri: importIcon}}
                        />
                        <Text style={styles.textStyle}>{this.props.name}</Text>
                    </View>
                    <View style={styles.icons}>
                        <View style={styles.icon1}>
                            <Icon
                                name={this.props.icon1}
                                type='font-awesome'
                                color='#F4CAE0'
                                onPress={this.props.press1}
                                size={42} />
                        </View>
                        <View style={styles.icon2}>
                            <Icon
                                name={this.props.icon2}
                                type='font-awesome'
                                color='#F4CAE0'
                                onPress={this.props.press2}
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
    cardInfo: {
        paddingTop:5,
        flexDirection: 'column',
        justifyContent: "space-evenly",
    },
    textStyle: {
        alignSelf: 'center',
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    textStyleAsigned:{
        alignSelf: 'center',
        padding: 10,
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    logo: {
        marginTop:10,
        marginLeft: 10,
        width: 75,
        height: 75,
    },
    icons: {
        justifyContent: 'space-evenly',
    },
    icon1: {
        padding: 5,
    },
    icon2: {
        padding: 5,
    },
    image:{
        justifyContent:'center'
    },
    asignedIcon:{
        alignSelf: 'center',
        width: 26,
        height: 28,
    }
});