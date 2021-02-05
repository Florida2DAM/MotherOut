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
    Button,
    Text,

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

import imagen from '../../assets/taskAssignment.png'

const picture = Image.resolveAssetSource(imagen).uri;

class ManualAssignment extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                <ScrollView>
                <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10 ,marginLeft:10, marginRight:10}}>
                    <Image
                            style={{ width: 330, height: 110 }}
                            source={{ uri: picture }}
                        />
                    </View>
                    
                    <View style={ styles.StyleText}>
                        <Text style={{ color: 'black', fontSize:24}}>Task Name</Text>
                    </View>
                    <View>
                    <Input style={styles.box }></Input>
                    </View>
                    <View style={ styles.StyleText}>
                    <Text style={{ color: 'black', fontSize:24}}>Select Members</Text>
                    </View>
                    <View>
                    <Input style={styles.box }></Input>
                    </View>
                    <View style={ styles.StyleText}>
                    <Text style={{ color: 'black', fontSize:24}}>Select Day</Text>
                    </View>
                    <View>
                    <Input style={styles.box }></Input>
                    </View>
                    <View></View>
                   
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
    StyleText:{
        marginTop: 20, 
        marginBottom: 10 ,
        marginLeft:30, 
        marginRight:10,
        
    },
    box:{
             
       
        borderRadius: 3,
        backgroundColor:'#D7B9D5',
        marginLeft:27
       
      },

  
    
});

export default ManualAssignment;