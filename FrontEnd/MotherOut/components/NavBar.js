import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';

export  class NavBar extends Component {

    render() {

        return(

            <View style={styles.buttonView}>
                <Icon name='check' type='font-awesome' color='#D7B9D5' size={35}
                      onPress={this.props.checked}/>
                <Icon name='list' type='font-awesome' color='#D7B9D5' size={35}
                      onPress={this.props.list}/>
                <Icon name='calendar' type='font-awesome' color='#D7B9D5' size={35}
                      onPress={this.props.calendar}/>
                <Icon name='bar-chart-o' type='font-awesome' color='#D7B9D5' size={35}
                      onPress={this.props.nav}/>
                <Icon name='gear' type='font-awesome' color='#D7B9D5' size={35}
                      onPress={this.props.settings}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({

    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
});
