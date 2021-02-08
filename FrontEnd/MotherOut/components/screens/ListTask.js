/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';

import { Image } from 'react-native-elements';

import imagen from '../../assets/listTask.png';
import { NavBar } from '../NavBar';
import { TaskCard } from '../TaskCard';
import { RoundedButton } from '../RoundedButton';

const picture = Image.resolveAssetSource(imagen).uri;

class ListTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ taskName: 'trash', text: 'clean bathroom' },
            { taskName: 'trash', text: 'clean room' },
            { taskName: 'trash', text: '2 clean room' },
            ],
        };
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }}
                        />
                    </View>
                    <View style={styles.body}>
                        <FlatList data={this.state.data}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ padding: 5 }}>
                                    <TaskCard text={item.text} icon={item.taskName} />
                                </View>)}
                        />
                        <RoundedButton icon={'plus'} />
                    </View>
                    <View>
                        <NavBar
                            checked={() => this.props.navigation.navigate('ScreenToDo')}
                            list={() => this.props.navigation.navigate('ListTask')}
                            calendar={() => this.props.navigation.navigate('TaskAssignment')}
                            nav={() => this.props.navigation.navigate('Statistics')}
                            settings={() => this.props.navigation.navigate('Setting')}
                        />
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

});

export default ListTask;
