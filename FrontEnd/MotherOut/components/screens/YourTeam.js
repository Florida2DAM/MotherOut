import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import imagen from '../../assets/yourTeam.jpg';
import {GenericInput3} from '../GenericInput3';
import {NavBar} from '../NavBar';
import {RoundedButton} from '../RoundedButton';
import {RoundedButton2} from '../RoundedButton2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const picture = Image.resolveAssetSource(imagen).uri;

class YourTeam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            user: [],
            teamData: [],
            nameTeam: null,
            newNameTeam: null,
        };
    }

    componentDidMount = () => {
        // alert(this.props.route.params.user);
        this.getData().then(
            () => {
                console.log(this.state.user);
                this.getUserByTeam(this.state.user.AsignedTeam);
                this.getTeamName(this.state.user.AsignedTeam);
            });
    };

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('logUser');
            jsonValue != null ? this.setState({user: JSON.parse(jsonValue)}) : null;
        } catch (e) {
            alert(e);
        }
    };

    getUserByTeam = (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({teamData: response.data});
        })
            .catch(function (error) {
                alert(error);
            });
    };

    getTeamName = (idTeam) => {
        axios.get('http://52.0.146.162:80/api/Teams?idTeam=' + idTeam).then(response => {
            this.setState({nameTeam: response.data});
        })
            .catch(function (error) {
                alert(error);
            });
    };

    deleteTeam = () => {
        axios.delete('http://52.0.146.162:80/api/Teams?idTeam='+this.state.user.AsignedTeam).then(response=>{
            if(response.data===true){
                alert("your team is history");
            }
            else {
                alert("not delete the team");
            }
        });
    };

    putNameTeam = () => {
        axios.put('http://52.0.146.162:80/api/Teams?idTeam='+this.state.user.AsignedTeam+'&newTeamName='+this.state.newNameTeam).then(response=>{
            if (response.data==true){
                alert("Your new name team is changed");
            }
            else{
                alert("not change your name team");
            }
        });

    };

    createTeam = () => {
        let newTeam={
            TeamName:this.state.newNameTeam,
        }
        axios.post('http://52.0.146.162:80/api/Teams?&idUser='+this.state.user.UserId,newTeam).then(response=>{
            if(response.data===true){
                alert("you have a new team");
            }
            else{
                alert("Don´t have new team");
            }
        })
    };
    saidHelllo = (item) => {
        alert("hola long press"+item.Name);
    };

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
                        <View style={styles.garbage}>
                            <Text style={styles.text}>Group name</Text>
                            <View style={{flexDirection: 'row'}}>
                                <RoundedButton2 icon={'edit'} press={this.putNameTeam}/>
                                <RoundedButton2 icon={'trash'} press={this.deleteTeam}/>
                            </View>
                        </View>
                        <View>
                            <GenericInput3 placeHolder={this.state.nameTeam} value={this.state.newNameTeam}
                                           onChange={(item) => this.setState({newNameTeam: item.name})}/>
                        </View>
                        <View>
                            <Text style={styles.text}>Members</Text>
                        </View>
                        <View style={{marginTop: 18}}>
                            <FlatList data={this.state.teamData}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({item}) =>
                                          <View style={styles.userBox}>
                                              <Pressable onLongPress={()=>{this.saidHelllo(item)}}>
                                                  <Text style={styles.textStyle}>{item.Name}</Text>
                                              </Pressable>
                                          </View>}
                            />
                        </View>
                    </View>
                    <View>
                        <RoundedButton icon="plus" press={this.createTeam}/>
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
    },
    header: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: "Roboto",
        padding: 10,
    },
    garbage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userBox: {
        backgroundColor: '#D7B9D5',
        alignItems: 'center',
    },
    textStyle: {
        padding: 10,
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
});
export default YourTeam;
