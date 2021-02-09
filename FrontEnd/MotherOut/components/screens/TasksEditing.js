import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Image, Input} from 'react-native-elements';
import imagen from '../../assets/tasksEditing.png';
import {GenericInput2} from '../GenericInput2';
import {InputData} from '../InputData';
import {NavBar} from '../NavBar';
import {RoundedButton} from '../RoundedButton';
import {SelectedItem} from '../SelectedItem';
import axios from 'axios';

const picture = Image.resolveAssetSource(imagen).uri;

class TasksEditing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            date: null,
            idTeam: null,
            idTask: null,
            nameTask:null,
            teamData:[],
        };
    }

    componentDidMount() {

        this.loadData();
    }

    loadData(){
        //recuperar los valores que me mandar desde otra pagina.
        //const idUser = this.props.route.params.userId;
        //const taskId=this.props.route.params.taskId;
        //const taskName=this.props.route.params.taskName;
        this.setState({idTask:1});
        this.setState({nameTask:"Div Div Div"});
        const idUser = 1;
        this.getIdTeam(idUser);
    }
    getIdTeam(idUser) {
        axios.get('http://52.0.146.162:80/api/Users?idUser=' + idUser).then(response => {
            this.setState({idTeam: response.data.AsignedTeam});
            this.getUsersByTeam(this.state.idTeam);
        })
            .catch(function (error) {
                alert(error);
            });
    }
    getUsersByTeam(idTeam) {
        axios.get('http://52.0.146.162:80/api/Users?idTeam=' + idTeam).then(response => {
            this.setState({teamData: response.data});
        })
            .catch(function (error) {
                alert(error);
            });

    }

    updateTask(){
        const datenow=this.state.date;
       alert(datenow);
       //alert("la fecha es: "+this.state.date+"el nombre es: "+this.state.name);
    }

    getName = (item) => {
        return this.setState({
            name: item.Name,
        });
    };

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
                            <GenericInput2 disabled={true} placeHolder={this.state.nameTask} passValue={false}/>
                            <Text style={styles.textStyle}>Selected member</Text>
                            <SelectedItem list={this.state.teamData} value={this.state.name} selectedItem={this.getName}/>
                            <Text style={styles.textStyle}>Select day</Text>
                            <InputData value={this.state.date}
                                       press={(item) => this.setState({date: item.day + '-' + item.month + '-' + item.year})}/>
                        </View>
                    </ScrollView>
                    <View>
                        <RoundedButton icon='check' press={this.updateTask}/>
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
        alignItems: 'center',
    },
    body: {
        marginTop: 2,
        justifyContent: 'space-evenly',
        padding: 10,
        flex: 10,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Roboto',
        padding: 10,
    },
});

export default TasksEditing;
