
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/newOrEditTask.png';
import { GenericInput2 } from '../GenericInput2';
import { NavBar } from '../NavBar';
import { RoundedButton } from '../RoundedButton';


const picture = Image.resolveAssetSource(imagen).uri;

class NewOrEditTask extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }} />
                    </View>
                    <View style={styles.body}>
                     
                        <GenericInput2 placeHolder="Task name" />
               
                        <GenericInput2 placeHolder="Score" />
                
                        <GenericInput2 placeHolder="Iconooooooos" />
                        
                        <RoundedButton icon="check"/>
                    </View>
                    <View>
                        <NavBar />
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
        backgroundColor: '#90A8C3',
        borderWidth: 2,
    },
    header: {
        marginTop:2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop:2,
        justifyContent:'space-evenly',
        padding:15,
        flex:10,
    },
});

export default NewOrEditTask;