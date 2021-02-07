import React, {Component} from 'react';
import {
    Pressable, StyleSheet,
    Text, View
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Menu from 'react-native-material-menu';


LocaleConfig.locales['Es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    dayNamesShort: ["Lun", "Mart", "Mié", "Jue", "Vier", "Sáb", "Dom"],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'Es';


export class InputData extends Component {
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
                              <View style={styles.dateBox}>
                                  <Text style={styles.dateStyle}>{this.props.value}</Text>
                              </View>
                          </Pressable>
                      }>
                    <Calendar
                        onDayPress={this.props.press}
                    />
                </Menu>
            </>
        )
    }
}


const styles = StyleSheet.create({
    dateBox: {
        backgroundColor: '#D7B9D5',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
    dateStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: "Roboto",
        fontWeight: "bold",
    }
});
