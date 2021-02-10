import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
//All screens
import Help1 from './components/screens/Help1';
import AddUser from './components/screens/AddUser';
import AsignedTask from './components/screens/AsignedTasks';
import CreateOrJoinTeam from './components/screens/CreateOrJoinTeam';
import JoinTeam from './components/screens/JoinTeam';
import ListTask from './components/screens/ListTask';
import Login from './components/screens/Login';
import ManualAssignment from './components/screens/ManualAssignment';
import NewOrEditTask from './components/screens/NewOrEditTask';
import ScreenToDo from './components/screens/ScreenToDo';
import Setting from './components/screens/Setting';
import SingUp from './components/screens/SingUp';
import Statistics from './components/screens/Statistics';
import TaskAssignment from './components/screens/TaskAssignment';
import TasksEditing from './components/screens/TasksEditing';
import YourTeam from './components/screens/YourTeam';
import GlobalSettings from './components/screens/GlobalSettings';

const navigationContainer = createStackNavigator();

class App extends Component {
    render() {
        return (
            <>
                <NavigationContainer>
                    <navigationContainer.Navigator>
                        <navigationContainer.Screen options={{ headerShown: false }} name="Login" component={Login} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="AddUser" component={AddUser} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="AsignedTask" component={AsignedTask} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="CreateOrJoinTeam" component={CreateOrJoinTeam} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="JoinTeam" component={JoinTeam} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="ListTask" component={ListTask} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="ManualAssignment" component={ManualAssignment} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="NewOrEditTask" component={NewOrEditTask} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="ScreenToDo" component={ScreenToDo} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="Setting" component={Setting} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="SingUp" component={SingUp} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="Statistics" component={Statistics} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="TaskAssignment" component={TaskAssignment} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="TasksEditing" component={TasksEditing} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="YourTeam" component={YourTeam} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="Help1" component={Help1} />
                        <navigationContainer.Screen options={{ headerShown: false }} name="GlobalSettings" component={GlobalSettings} />
                    </navigationContainer.Navigator>
                </NavigationContainer>
            </>
        );
    }

}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
