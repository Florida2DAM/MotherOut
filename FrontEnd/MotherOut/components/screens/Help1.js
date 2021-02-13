import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {Image} from 'react-native-elements';
import {GenericButton} from '../GenericButton';

let Image_Http_URL1 = {uri: 'https://i.imgur.com/SLt3m2U.png'};
let Image_Http_URL2 = {uri: 'https://i.imgur.com/7dY0d9i.png'};
let Image_Http_URL3 = {uri: 'https://i.imgur.com/AYId86I.png'};
let Image_Http_URL4 = {uri: 'https://i.imgur.com/MNoC59o.png'};
let Image_Http_URL5 = {uri: 'https://i.imgur.com/mNFy0JN.png'};

class Help1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
        }

    }

    componentDidMount = () => {
        this.getData().then(() => console.log(this.state.user));
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser')
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset("User data could not be loaded.", ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50);
        }
    }

    checkExistenceOfTeam = async () => {
        if (this.state.user.AsignedTeam === 0 || this.state.user.AsignedTeam === null || this.state.user.NTaks===0 || this.state.user.UserScore===0) {
            this.props.navigation.navigate('CreateOrJoinTeam');
        } else {
            this.props.navigation.navigate('ScreenToDo');
        }
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Swiper>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={Image_Http_URL1}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={Image_Http_URL2}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={Image_Http_URL3}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={Image_Http_URL4}
                            />
                        </View>
                        <View style={styles.pictures}>
                            <Image
                                style={{width: 350, height: 470}}
                                source={Image_Http_URL5}
                            />
                            <View style={{marginTop: 75}}>
                                <GenericButton button={'Skipt!'}
                                               press={this.checkExistenceOfTeam}/>
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
