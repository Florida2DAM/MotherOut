import React, { Component } from 'react';
import {
    StyleSheet,
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
                    <View style={styles.header}>
                        <View style={styles.pictures}>
                            <Image
                                style={{ width: 300, height: 90 }}
                                source={{ uri: picture }}
                            />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View >
                            <GenericIconButton button="MANUAL ASSIGNMENT" icon='wrench' />
                        </View>
                        <View >
                            <GenericIconButton button="RANDOM ASSIGNMENT" icon='random' />
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
        justifyContent: 'center',

    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,

    },
    StyleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10,

    },
    button1: {
        marginBottom: 1,
    },
    button2: {
        marginTop: 1,
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    }
});

export default TaskAssignment;
