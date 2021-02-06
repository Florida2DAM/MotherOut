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
import imagen from '../../assets/help1.png'

const picture = Image.resolveAssetSource(imagen).uri;




class Help1 extends Component {

    render() {
        return (
            <>
                <View style={styles.container}>
                <ScrollView>
                    <View style={styles.pictures}>
                        <Image
                            style={{ width: 350, height: 460 }}
                            source={{ uri: picture }}
                        />
     
                    </View>
                   
                    <View style={styles.button}>
                    <Button
                            title="Skip!"
                        />
                    </View>
                    
                    </ScrollView>
                </View>
                
            </>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        flexDirection: 'column',
        borderColor: 'white',
        alignContent: 'center',
        backgroundColor: '#90A8C3',


    },

    pictures:{
        
         marginTop: 30, 
         marginBottom: 10,
         marginLeft : 30,
         
    },

    button:{
        marginTop: 190, 
        marginBottom: 0,
    }
    
});

export default Help1;
