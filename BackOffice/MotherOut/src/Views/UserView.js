import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import axios from 'axios';
import 'primeflex/primeflex.css';
import {TabPanel, TabView} from "primereact/tabview";
//My Components
import {RefreshButton} from '../Components/RefreshButton'
import {DeleteButton} from '../Components/DeleteButton'
import {MotherOutInputText} from "../Components/MotherOutInputText";
import {MotherOutButton} from "../Components/MotherOutButton";
import {Toast} from "primereact/toast";

export class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValues: [],
            //Search
            searchValueName: '',
            searchValueSurname: '',
            searchValueEmail: '',
            //Delete
            deleteValue: '',
            //Reset Pass
            emailValue: '',
            oldPassValue: '',
            newPassValue: '',
            confirmPassValue: '',
        }
        this.myToast = React.createRef()
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <>
                <Toast ref={this.myToast}/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='Filtrar' leftIcon='pi pi-filter'>
                        <div className='p-grid p-fluid'>
                            <RefreshButton onClick={this.getUsers}/>
                            <MotherOutInputText onChange={this.changeValueEmail} value={this.state.searchValueEmail}
                                                size={'p-md-3'} name={'Email'}/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Eliminar' leftIcon='pi pi-trash'>
                        <div className='p-grid p-fluid'>
                            <DeleteButton onClick={this.delUser}/>
                            <MotherOutInputText onChange={(e) => this.setState({deleteValue: e.target.value})}
                                                value={this.state.deleteValue}
                                                size={'p-md-3'} name={'Email'}/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Restablecer clave' leftIcon='pi pi-reply'>
                        <div className='p-grid p-fluid'>
                            <MotherOutInputText onChange={(e) => this.setState({emailValue: e.target.value})}
                                                value={this.state.emailValue}
                                                size={'p-md-6'} name={'Email'}/>
                            <MotherOutInputText onChange={(e) => this.setState({oldPassValue: e.target.value})}
                                                value={this.state.oldPassValue}
                                                size={'p-md-6'} name={'Contraseña'}/>
                            <MotherOutInputText onChange={(e) => this.setState({newPassValue: e.target.value})}
                                                value={this.state.newPassValue}
                                                size={'p-md-6'} name={'Nueva contraseña'}/>
                            <MotherOutInputText onChange={(e) => this.setState({confirmPassValue: e.target.value})}
                                                value={this.state.confirmPassValue}
                                                size={'p-md-6'} name={'Confirmar contraseña'}/>
                        </div>
                        <MotherOutButton label={'Restablecer'} icon={'pi pi-refresh'} onClick={this.resetPass}/>
                    </TabPanel>
                </TabView>
                <div className='card'>
                    <DataTable value={this.state.tableValues}>
                        <Column field='UserId' header='UserId'/>
                        <Column field='Name' header='Nombre'/>
                        <Column field='Email' header='Email'/>
                        <Column field='UserMaster' header='Usuario Master'/>
                        <Column field='AsignedTeam' header='Id Equipo'/>
                        <Column field='NTaks' header='Tareas realizadas'/>
                        <Column field='UserScore' header='Score'/>
                        <Column field='Help' header='Help'/>
                    </DataTable>
                </div>
            </>
        );
    }

    //Input handlers
    changeValueEmail = (event) => {
        this.setState({searchValueEmail: event.target.value}, () => {
            this.state.searchValueEmail !== '' ? this.filterByEmail() : this.getUsers();
            //this.setState({searchValueName: '', searchValueSurname: ''})
        })
    }

    //Axios requests
    getUsers = () => {
        this.axiosRequest('http://52.0.146.162:80/api/Users')
    }
    filterByEmail = () => {
        this.axiosRequestArray('http://52.0.146.162:80/api/Users?email=' + this.state.searchValueEmail);
    }
    delUser = () => {
        if (this.state.deleteValue !== '') {
            this.advAxiosRequest('http://52.0.146.162:80/api/Users?email=' + this.state.deleteValue, 'https://localhost:44390/api/Usuarios', 'User deleted', 'delete')
        } else {
            this.showToast('warn', 'Campos Vacíos')
        }
        this.setState({deleteValue: ''});
    }

    //My Funcs
    //Axios
    axiosRequest = (url) => {
        axios.get(url).then((response) => {
            this.changeFormat(response);
            this.setState({tableValues: response.data});
        })
    }
    axiosRequestArray = (url) => {
        axios.get(url).then((response) => {
            let array = [];
            array.push(response.data)
            //this.changeFormatArray(response);
            this.setState({tableValues: array});
        })
    }
    advAxiosRequest = (url, callbackUrl, succesMessage, requestType) => {
        if (requestType === 'delete') {
            this.req = axios.delete;
        }
        if (requestType === 'post') {
            this.req = axios.post;
        }
        if (requestType === 'put') {
            this.req = axios.put;
        }
        if (requestType === 'get') {
            this.req = axios.get;
        }

        this.req(url).then((response) => {
            if (response !== null) {
                this.showToast('success', succesMessage);
                this.axiosRequest(callbackUrl);
            }
        }).catch((err) => {
            if (err != null) {
                this.showToast('error', 'Request Error');
            }
        });
    }
    //Toast
    showToast = (severityValue, summaryValue, detailValue) => {
        this.myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});
    }
    //data table format
    changeFormat = (response) => {
        response.data.forEach(u => u.Help ? u.Help = 'Show' : u.Help = 'Hidden');
    }
    changeFormatArray = (array) => {
        array.forEach(u => u.Help ? u.Help = 'Show' : u.Help = 'Hidden');
    }

    //Codigo reserva
    //   <MotherOutInputText onChange={this.changeValueName} value={this.state.searchValueName}
    //                        size={'p-md-3'} name={'Nombre'}/>
    //    <MotherOutInputText onChange={this.changeValueSurname} value={this.state.searchValueSurname}
    //                        size={'p-md-3'} name={'Apellidos'}/>
}

