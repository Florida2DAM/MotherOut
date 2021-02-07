import React, { Component } from 'react';
import {
    Button, StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/taskAssignment.png';





const picture = Image.resolveAssetSource(imagen).uri;


class TaskAssignment extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                <View style={styles.secction1}>
                
                    <View style={styles.pictures}>
                    <Image
                            style={{  width: 300, height: 90  }}
                            source={{ uri: picture }}
                        />
                    </View>
                    </View>
                    <View style={styles.secction2}>
                   
                    <View style={styles.button1 }>
                        <Button
                            title="MANUAL ASSIGNMENT"
                        />
                    </View>
                    
                    <View style={styles.button2} >
                        <Button
                            title="RANDOM ASSIGNMENT"
                        />
                    </View>
                    </View>
                    <View style={styles.secction3}>
                    <View>
                        <View></View>
                    </View>
                    </View>
                   
                    
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
    secction1: {
        flex: 2,
        flexDirection: 'column',
        borderWidth: 3,
        borderColor: 'black',

    },
    secction2: {
        flex: 10,
        borderWidth: 3,
        flexDirection: 'column',
        borderColor: 'black',


    },
    secction3: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 3,
        borderColor: 'black',


    },
    pictures:{
        marginTop: 30,
        marginBottom: 10,
        marginLeft:10,
        marginRight:10
    },
    button1:{
        marginTop: 150,
        marginBottom: 10 ,
    },
    button2:{
        marginTop: 50,
         marginBottom: 10,
    }
    
});

export default TaskAssignment;
