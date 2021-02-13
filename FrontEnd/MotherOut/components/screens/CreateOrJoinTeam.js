import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {GenericIconButton} from '../GenericIconButton';
import {NavBar} from '../NavBar';

let Image_Http_URL = {uri: 'https://i.imgur.com/RSLsLUP.png?1'};

class CreateOrJoinTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: null,
        };
    }

    renderNavBar = () => {
        if (!this.state.user.UserMaster) {
            this.setState({
                navBar:
                    <NavBar
                        checked={() => this.props.navigation.navigate('ScreenToDo')}
                        list={() => this.props.navigation.navigate('ListTask')}
                        calendar={() => this.props.navigation.navigate('TaskAssignment')}
                        nav={() => this.props.navigation.navigate('Statistics')}
                        settings={() => this.props.navigation.navigate('Setting')}
                    />
            })
        }
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 333, height: 90}}
                            source={Image_Http_URL}
                        />
                    </View>
                    <View style={styles.body}>
                        <GenericIconButton button="Create Team" icon='plus'
                                           press={() => this.props.navigation.navigate('YourTeam')}/>
                        <GenericIconButton button="Join Team" icon='users'
                                           press={() => this.props.navigation.navigate('JoinTeam')}/>
                    </View>
                    <View>
                        {this.state.renderNavBar}
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
