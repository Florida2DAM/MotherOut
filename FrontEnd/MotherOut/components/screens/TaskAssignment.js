import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/taskAssignment.png';
import { GenericIconButton } from '../GenericIconButton';
import { NavBar } from '../NavBar';

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
                        <GenericIconButton
                            button="MANUAL ASSIGNMENT"
                            icon='wrench'
                            press={() => this.props.navigation.navigate('ManualAssignment')}
                        />
                        <GenericIconButton
                            button="RANDOM ASSIGNMENT"
                            icon='random'
                            press={() => this.props.navigation.navigate('AsignedTask')}
                        />
                    </View>
                    <NavBar
                        checked={() => this.props.navigation.navigate('ScreenToDo')}
                        list={() => this.props.navigation.navigate('ListTask')}
                        calendar={() => this.props.navigation.navigate('TaskAssignment')}
                        nav={() => this.props.navigation.navigate('Statistics')}
                        settings={() => this.props.navigation.navigate('Setting')}
                    />
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
