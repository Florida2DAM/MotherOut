import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/CreateOrJoinTeam.png';
import {GenericIconButton} from '../GenericIconButton';
import {NavBar} from '../NavBar';

const picture = Image.resolveAssetSource(image).uri;

class CreateOrJoinTeam extends Component {

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
                        <GenericIconButton button="Create Team" icon='plus'
                                           press={() => this.props.navigation.navigate('YourTeam')}/>
                        <GenericIconButton button="Join Team" icon='users'
                                           press={() => this.props.navigation.navigate('JoinTeam')}/>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 15,
        flex: 10,
        borderTopColor: 'grey',
        borderBottomColor: '#90A8C3',
        borderRightColor: '#90A8C3',
        borderLeftColor: '#90A8C3',
        borderWidth: 1,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Roboto',
        padding: 15,
    },
    paddingView: {
        padding: 5,
    },
});

export default CreateOrJoinTeam;
