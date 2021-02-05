/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GenericInput1} from './components/GenericInput1';

class App extends Component {
constructor(props) {
    super(props);
    this.state={
        email : null,
        password:null
    }

}
    changeEmail(text){
    this.setState({email: text});
}
    changePassword(text){
    this.setState({password: text});
    }
    render() {
        return (
            <>
                <View style={styles.backGround}>
                    <View style={{flex: 1, backgroundColor: 'pink'}}></View>
                    <View style={{flex: 1}}>
                        <GenericInput1 placeHolder={'Email'} passValue={false} value={this.state.email} onChange={text => this.changeEmail(text) }/>
                        <GenericInput1 placeHolder={'Password'} passValue={true} value={this.state.password} onChange={text=>this.changePassword(text)}/>
                        <Text>{this.state.password}</Text>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'grey'}}></View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    backGround: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#90A8C3',
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
