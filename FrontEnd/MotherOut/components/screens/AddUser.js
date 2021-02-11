import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import imagen from '../../assets/addUser.png';
import {GenericInput2} from '../GenericInput2';
import {NavBar} from '../NavBar';
import {GenericButton} from '../GenericButton';


const picture = Image.resolveAssetSource(imagen).uri;

class AddUser extends Component {

    componentDidMount = () => {
        
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 300, height: 90}}
                            source={{uri: picture}}/>
                    </View>
                    <View style={styles.body}>
                        <GenericInput2 placeHolder="Email"/>
                        <GenericButton button="Add User"/>
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
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-between',
        padding: 15,
        flex: 10,
    },
    pictures: {
        alignSelf: 'center',
        padding: 5,
    },
});

export default AddUser;
