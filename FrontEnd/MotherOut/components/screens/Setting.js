import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import {
    Image
} from 'react-native-elements';
import imagen from '../../assets/setting.png';
import { GenericIconButton } from '../GenericIconButton';
import { NavBar } from '../NavBar';

const picture = Image.resolveAssetSource(imagen).uri;

class Setting extends Component {
    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <ScrollView>
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
                                button="Create Team"
                                icon='users'
                                press={() => this.props.navigation.navigate('YourTeam')}
                            />
                            <GenericIconButton
                                button="Join Team"
                                icon='user'
                                press={() => this.props.navigation.navigate('JoinTeam')}
                            />
                            <GenericIconButton
                                button="Global settings"
                                icon='cogs'
                                press={() => this.props.navigation.navigate('GlobalSettings')}
                            />
                        </View>
                    </ScrollView>
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
    pictures: {
        alignSelf: 'center',
        padding: 5,
    }
});

export default Setting;
