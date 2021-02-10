import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import image from '../../assets/GSettings.png';
import {NavBar} from "../NavBar";
import {GenericIconButton} from "../GenericIconButton";

const picture = Image.resolveAssetSource(image).uri;

class GlobalSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: 'toggle-on',
            change: true,
        }
    }

    enabledOrDisabledHelp = () => {
        if (this.state.change) {
            this.setState({change: false});
            this.setState({icon: 'toggle-off'});
        } else {
            this.setState({change: true});
            this.setState({icon: 'toggle-on'});
        }
    }

    componentDidMount = () => {
        alert(this.props.route.params.user);
    }

    render() {
        return (
            <>
                <View style={styles.contenidor}>
                    <View style={styles.header}>
                        <Image
                            style={{width: 350, height: 100}}
                            source={{uri: picture}}/>
                    </View>
                    <View style={styles.body}>
                        <GenericIconButton press={this.enabledOrDisabledHelp} icon={this.state.icon}
                                           button={'Show Help'}/>
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
        padding: 15,
        flex: 10,
        borderTopColor: 'grey',
        borderBottomColor: '#90A8C3',
        borderRightColor: '#90A8C3',
        borderLeftColor: '#90A8C3',
        borderWidth: 1,
    }
});

export default GlobalSettings;
