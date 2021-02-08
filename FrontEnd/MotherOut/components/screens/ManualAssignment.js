import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/manualAssignment.png'
import {NavBar} from "../NavBar";
import {GenericInput2} from "../GenericInput2";
import {RoundedButton} from "../RoundedButton";
import {InputData} from '../InputData'
import {SelectedItem} from '../SelectedItem'

const picture = Image.resolveAssetSource(image).uri;
const listUsers = [
    {name: 'Pablo'}, {name: 'Juan'}, {name: 'Jesús'}
]

class ManualAssignment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            date: null,
        }

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
                            style={{width: 290, height: 90}}
                            source={{uri: picture}}/>
                    </View>
                    <ScrollView>
                        <View style={styles.body}>
                            <Text style={styles.textStyle}>Task name</Text>
                            <GenericInput2 placeHolder={"Clean room"} passValue={false}/>
                            <Text style={styles.textStyle}>Selected member</Text>
                            <SelectedItem list={listUsers} value={this.state.name} selectedItem={this.getName}/>
                            <Text style={styles.textStyle}>Select day</Text>
                            <InputData value={this.state.date}
                                       press={(item) => this.setState({date: item.day+"-"+item.month+"-"+item.year})}/>
                        </View>
                    </ScrollView>
                    <View>
                        <RoundedButton icon='check'/>
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
        alignItems: "center",
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 20,
        fontFamily: "Roboto",
        padding: 10,
    },
});

export default ManualAssignment;
