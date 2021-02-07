import React, {Component} from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export class GenericInput2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Input inputStyle={styles.personalInput} onChangeText={this.props.onChange} value={this.props.value}
                   secureTextEntry={this.props.passValue} placeholder={this.props.placeHolder}
                   placeholderTextColor='black'/>
        );
    }
}

const styles = StyleSheet.create({
    personalInput: {
        backgroundColor: '#D7B9D5',
        borderRadius: 10,
        fontWeight:'bold',
        fontFamily: 'roboto',
    },
    personalInput2: {
        borderBottomColor: '#D7B9D5',
        padding: 5,
        fontFamily: 'roboto',
    },
});
