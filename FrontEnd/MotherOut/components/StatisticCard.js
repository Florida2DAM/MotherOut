import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

//Añadir el avatar de la bbdd
import avatar from '../assets/avatar2.png';

const userAvatar = Image.resolveAssetSource(avatar).uri

export class StatisticCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score: this.props.score,
            scoreMessage: null,
            message: null
        }
    }
    componentDidMount() {
        this.changeColorScore()
    }

    changeColorScore() {
        if (this.state.score >= 0 && this.state.score < 50) {
            this.setState({ scoreMessage: <Text style={styles.score1}>{this.state.score}</Text> })
            this.setState({ message: <Text style={styles.titleStyle}>The pig king</Text> })
        }
        if (this.state.score >= 50 && this.state.score < 100) {
            this.setState({ scoreMessage: <Text style={styles.score2}>{this.state.score}</Text> })
            this.setState({ message: <Text style={styles.titleStyle}>Piggy, but not much</Text> })
        }
        if (this.state.score >= 100 && this.state.score < 175) {
            this.setState({ scoreMessage: <Text style={styles.score3}>{this.state.score}</Text> })
            this.setState({ message: <Text style={styles.titleStyle}>Good boy</Text> })
        }
        if (this.state.score > 175) {
            this.setState({ scoreMessage: <Text style={styles.score4}>{this.state.score}</Text> })
            this.setState({ message: <Text style={styles.titleStyle}>The best boy</Text> })
        }
    }
    render() {
        return (
            <>
                <View style={styles.globalBox}>
                    <View style={styles.dataBox}>
                        <Text style={styles.headStyle}>{this.props.user}</Text>
                        <View style={styles.quantityBox}>
                            <Text style={styles.textStyle}>Quantity: </Text>
                            <Text style={styles.textStyle}>{this.props.quantity}</Text>
                        </View>
                        <View style={styles.scoreBox}>
                            <Text style={styles.textStyle}>Score: </Text>
                            {this.state.scoreMessage}
                        </View>
                    </View>
                    <View style={styles.avatarBox}>
                        <View style={styles.avatar}>
                            <Image
                                style={styles.logo}
                                source={{uri: this.props.avatarUser}}
                            />
                        </View>
                        <View style={styles.avatar}>
                            {this.state.message}
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    globalBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ADA7C9',
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
    dataBox: {
        padding: 10,
        flexDirection: 'column',
    },
    quantityBox: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
    scoreBox: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: "flex-start",
    },
    score1: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
        color: "red"
    },
    score2: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
        color: "brown"
    },
    score3: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
        color: "green"
    },
    score4: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
        color: "yellow"
    },
    avatarBox: {
        justifyContent: "center",
        padding: 5,
        flexDirection: 'column'
    },
    avatar: {
        alignSelf: 'center',
        padding: 10,
    },
    logo: {
        width: 106,
        height: 106,
    },
    headStyle: {
        fontSize: 30,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    textStyle: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
    },
    titleStyle: {
        padding: 5,
        fontSize: 20,
        fontFamily: "Roboto",
    },
});

