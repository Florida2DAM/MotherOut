/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,

    LogBox,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
    Image,
    Input,
} from 'react-native-elements';


class TaskAssignment extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                <ScrollView>
                    <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10 ,marginLeft:10, marginRight:10}}>
                    <Image
                            style={{ width: 350, height: 150 }}
                            source={{ uri: 'https://ep00.epimg.net/elpais/imagenes/2014/10/08/buenavida/1412766626_849373_1412938902_noticia_normal.jpg' }}
                        />
                    </View>
                   <View>
                    <View style={{  marginTop: 170, marginBottom: 10 ,}} >
                        <Button
                            title="MANUAL ASSIGNMENT"
                        />
                    </View>
                    <View style={{  marginTop: 50, marginBottom: 10 }} >
                        <Button
                            title="RANDOM ASSIGNMENT"
                        />
                    </View>
                    <View>

                    </View>
                    </View>
                    </ScrollView>
                </View>
                
            </>
        );
    }

}

const styles = StyleSheet.create({
    contenidor: {
        flex: 1,

        flexDirection: 'column',
        borderColor: 'white',
        alignContent: 'center',
        backgroundColor: '#90A8C3',


    },
    
});

export default TaskAssignment;