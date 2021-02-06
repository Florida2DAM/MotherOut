
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/joinTeam.png';
import { GenericInput2 } from '../GenericInput2';
import { NavBar } from '../NavBar';
import { GenericButton } from '../GenericButton';


const picture = Image.resolveAssetSource(imagen).uri;

class JoinTeam extends Component {

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
                        <View style={styles.input}>
                            <GenericInput2 placeHolder="Id Team" />
                        </View>
                        <View style={styles.button}>
                            <GenericButton button="Join Team" />
                        </View>
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
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
    },
    input: {
        marginTop: 60,
        marginBottom: 150,
    },
    button: {
        marginTop: 100,
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    },
});

export default JoinTeam;