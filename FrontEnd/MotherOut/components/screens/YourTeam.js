import React, {Component} from 'react';
import {FlatList, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon, Image,Input} from 'react-native-elements';
import imagen from '../../assets/yourTeam.png';
import {GenericInput3} from '../GenericInput3';
import {GenericInput2} from '../GenericInput2';
import {RoundedButton} from '../RoundedButton';
import {NavBar} from '../NavBar';
import {RoundedButton2} from '../RoundedButton2';
import {SelectedItem} from '../SelectedItem';
import Menu from 'react-native-material-menu';

const picture = Image.resolveAssetSource(imagen).uri;
const listUsers = [{name: 'Pablo'}, {name: 'Juan'}, {name: 'Jesus'},{name:'Jordi'},{name:'paco'}];

class YourTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
    }

    render() {
        return (
            <>

                <View style={styles.contenidor}>
                    <ScrollView>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}/>
                    </View>

                    <View style={styles.body}>

                        <View style={styles.garbage}>
                            <Text style={styles.text}>Group name</Text>
                            <RoundedButton2 icon={'trash'}/>
                        </View>
                        <GenericInput3 placeHolder="Task name"/>
                        <View>
                            <Text style={styles.text}>Members</Text>
                        </View>
                        <View style={{marginTop: 18}}>
                            <FlatList data={listUsers}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) =>
                                          <View style={styles.userBox}>
                                              <Pressable>
                                                  <Text style={styles.textStyle}>{item.name}</Text>
                                              </Pressable>
                                          </View>}
                            />
                            {/*<SelectedItem list={listUsers} value={this.state.name} />*/}
                        </View>
                    </View>
                    <View>
                        <RoundedButton icon="plus"/>
                    </View>
                </ScrollView>
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
    garbage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
});
export default YourTeam;
