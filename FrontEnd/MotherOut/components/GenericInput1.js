import React, { Component } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';


export class GenericInput1 extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Input inputStyle={styles.personalInput} inputContainerStyle={styles.personalInput2}
                placeholder={this.props.placeHolder} secureTextEntry={this.props.passValue}
                placeholderTextColor='black' onChangeText={this.props.onChange} value={this.props.value}
            />
        )
    }
}
const styles = StyleSheet.create({
    personalInput: {
        backgroundColor: '#90A8C3',
        fontFamily: 'roboto'
    },
    personalInput2: {
        borderBottomColor: '#D7B9D5',
        margin: 10,
        width: 375,
        paddingLeft: 8,
        fontFamily: 'roboto'
    }
})
