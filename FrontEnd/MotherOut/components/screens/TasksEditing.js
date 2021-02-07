import React, { Component } from 'react';
import {
    StyleSheet,
    Text, View
} from 'react-native';
import {
    Image,
    Input
} from 'react-native-elements';

import imagen from '../../assets/tasksEditiing.png';
const picture = Image.resolveAssetSource(imagen).uri;

class TasksEditing extends Component {

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.secction1}>
                        <View style={styles.pictures}>
                            <Image
                                style={{ width: 300, height: 90 }}
                                source={{ uri: picture }}
                            />
                        </View>
                    </View>
                    <View style={styles.secction2}>
                        <View style={styles.StyleText}>
                            <Text style={{ color: 'black', fontSize: 24 }}>Task Name</Text>
                        </View>
                        <View>
                            <Input style={styles.box}></Input>
                        </View>
                        <View style={styles.StyleText}>
                            <Text style={{ color: 'black', fontSize: 24 }}>Select Member</Text>
                        </View>
                        <View>
                            <Input style={styles.box}></Input>
                        </View>
                        <View style={styles.StyleText}>
                            <Text style={{ color: 'black', fontSize: 24 }}>Select Day</Text>
                        </View>
                        <View>
                            <Input style={styles.box}></Input>
                        </View>
                    </View>
                    <View style={styles.secction3}>
                        <View>
                            <Text>HOLA</Text>
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
    },
    secction2: {
        flex: 10,
        flexDirection: 'column',
    },
    secction3: {
        flex: 1,
        flexDirection: 'column',
    },
    StyleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10,
    },
    box: {
        backgroundColor: '#D7B9D5',
        marginLeft: 27
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    }
});

export default TasksEditing;
