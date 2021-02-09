import React, { Component } from 'react';
import {
    FlatList,
    Pressable, StyleSheet,
    Text, View
} from 'react-native';
import {
    Icon, Image
} from 'react-native-elements';
import Menu from 'react-native-material-menu';

export class SelectedItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null,
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

    render() {
        return (
            <>
                <Menu ref={this.setMenuRef}
                    button={
                        <Pressable onPress={this.showMenu}>
                            <View style={styles.nameBox}>
                                <Text style={styles.nameStyle}>{this.props.value}</Text>
                            </View>
                        </Pressable>
                    }>
                    <FlatList
                        data={this.props.list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <Pressable onPress={this.props.selectedItem.bind(this, item)}>
                                <View style={styles.headUser}>
                                    <Text style={styles.textStyle}>{item.name}</Text>
                                    <Image
                                        style={styles.logo}
                                        source={{ uri: item.blop }}
                                    />
                                </View>
                            </Pressable>
                        }
                    />
                </Menu>
            </>
        )
    }
}

const styles = StyleSheet.create({
    headUser: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#D7B9D5'
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold"
    },
    nameBox: {
        backgroundColor: '#D7B9D5',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    nameStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold",
    }
});
