import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import imagen from '../../assets/yourTeam.png';
import {GenericInput2} from '../GenericInput2';
import {RoundedButton} from '../RoundedButton';
import {NavBar} from '../NavBar';

const picture = Image.resolveAssetSource(imagen).uri;

class YourTeam extends Component {
    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}/>
                    </View>
                    <View style={styles.body}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={styles.text}>Group name</Text>
                            <Icon
                                raised
                                name='trash'
                                type='font-awesome'
                                color='#f50'
                                onPress={() => console.log('hello')} />
                        </View>
                        <GenericInput2 placeHolder="Task name"/>
                        <Text style={styles.text}>Members</Text>
                        <GenericInput2 placeHolder="Score"/>
                        <RoundedButton icon="plus"/>
                    </View>
                    <View>
                        <NavBar/>
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
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
export default YourTeam;
