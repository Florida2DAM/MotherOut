
import React, { Component } from 'react';
import {
    FlatList,
    Pressable, StyleSheet,

    Text, View
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import {
    Icon, Image
} from 'react-native-elements';
import Menu from 'react-native-material-menu';
import importedPicture from '../../assets/asignedTasks.png';
import importAvatar2 from '../../assets/avatar2.png';
import importIcon from '../../assets/bathtub.png';
import importAvatar from '../../assets/circle-cropped.png';
import { NavBar } from '../NavBar';

const avatar = Image.resolveAssetSource(importAvatar).uri
const avatar2 = Image.resolveAssetSource(importAvatar2).uri
const icon = Image.resolveAssetSource(importIcon).uri
const picture = Image.resolveAssetSource(importedPicture).uri;



import { InputData } from '../InputData'
import { SelectedItem } from '../SelectedItem'


const listUsers = [
    { name: 'Pablo', blop: avatar2 }, { name: 'Juan', blop: avatar }, { name: 'Jesus', blop: avatar }
]




class NewOrEditTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            fecha: null,
        }
    }



    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };

    algo = (item) => {
        this.setState({ name: item.name })
        this.hideMenu;
    }

    getName = (item) => {
        return this.setState({
            name: item.name
        })
    }
    
    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{ width: 300, height: 90 }}
                            source={{ uri: picture }} />
                    </View>
                    <View style={styles.body}>
                        <SelectedItem list={listUsers} value={this.state.name} selectedItem={this.getName}></SelectedItem>
                        <InputData value={this.state.fecha} press={(item) => this.setState({ fecha: item.dateString })}></InputData>
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
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        flex: 10,
    },
    menuView: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 10,
    },
    headUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'pink'
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    logo: {
        width: 66,
        height: 58,
    },
});

export default NewOrEditTask;