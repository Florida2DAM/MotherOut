/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,

    LogBox, FlatList,
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

import imagen from '../../assets/listTask.png';
import {NavBar} from '../NavBar';
import {TaskCard} from '../TaskCard';

const picture = Image.resolveAssetSource(imagen).uri;

class ListTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{taskName: 'trash', text: 'clean bathroom'},
                {taskName: 'trash', text: 'clean room'},
                {taskName: 'trash', text: '2 clean room'},
            ],
        };
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}
                        />
                    </View>
                    <View style={styles.body}>

                        <FlatList data={this.state.data}
                                  keyExtractor={(item, index) => index.toString()}

                                  renderItem={({item}) => (
                                      <View style={{padding: 5}}>
                                          <TaskCard text={item.text} icon={item.taskName}/>
                                      </View>)}
                        />
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

    StyleText: {
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 10,

    },
    box: {

        borderRadius: 3,
        backgroundColor: '#D7B9D5',
        marginLeft: 27,

    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    },


});

export default ListTask;
