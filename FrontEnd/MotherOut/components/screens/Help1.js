/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Swiper from 'react-native-swiper'
import {ScrollView, StyleSheet, View} from 'react-native';

import {Image} from 'react-native-elements';
import imagen from '../../assets/help1_1.png';
import imagen2 from '../../assets/help2_1.png';
import imagen3 from '../../assets/help3_1.png';
import imagen4 from '../../assets/help4_1.png';
import imagen5 from '../../assets/help5_1.png';
import { GenericButton } from '../GenericButton';

const picture = Image.resolveAssetSource(imagen).uri;
const picture2 = Image.resolveAssetSource(imagen2).uri;
const picture3 = Image.resolveAssetSource(imagen3).uri;
const picture4 = Image.resolveAssetSource(imagen4).uri;
const picture5 = Image.resolveAssetSource(imagen5).uri;


class Help1 extends Component {

    render() {
        return (
            <>

                <View style={styles.container}>
                    <Swiper>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={{uri: picture}}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={{uri: picture2}}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={{uri: picture3}}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={{uri: picture4}}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={{uri: picture5}}
                            />
                            <View style={{marginTop:75}}>
                                <GenericButton button={'Skipt!'} press={() => this.props.navigation.navigate('CreateOrJoinTeam')} />
                            </View>
                        </View>
                    </Swiper>
                </View>

            </>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#90A8C3',
    },
    pictures: {
        padding: 5
    },
});

export default Help1;
