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
import {Toast} from "primereact/toast";

export class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValues: [],
            //Search
            searchValueName: '',
            searchValueAsignedTeam: '',
            searchValueEmail: '',
            //Delete
            deleteValue: '',
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
                    <TabPanel header='Filter' leftIcon='pi pi-filter'>
                        <div className='p-grid p-fluid'>
                            <RefreshButton onClick={this.getUsers}/>
                            <MotherOutInputText onChange={this.changeValueEmail} value={this.state.searchValueEmail}
                                                size={'p-md-3'} name={'Email'}/>
                            <MotherOutInputText onChange={this.changeValueIdTeam}
                                                value={this.state.searchValueAsignedTeam}
                                                size={'p-md-3'} name={'Id Team'}/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Delete' leftIcon='pi pi-trash'>
                        <div className='p-grid p-fluid'>
                            <RefreshButton onClick={this.getUsers}/>
                            <DeleteButton onClick={this.delUser}/>
                            <MotherOutInputText onChange={(e) => this.setState({deleteValue: e.target.value})}
                                                value={this.state.deleteValue}
                                                size={'p-md-3'} name={'Id User'}/>
                        </div>
                    </TabPanel>
                </TabView>
                <div className='card'>
                    <DataTable value={this.state.tableValues}>
                        <Column field='UserId' header='UserId' style={{width: '5%'}}/>
                        <Column field='Name' header='Name' style={{width: '10%'}}/>
                        <Column field='Email' header='Email' style={{width: '15%'}}/>
                        <Column field='UserMaster' header='User Master' style={{width: '10%'}}/>
                        <Column field='AsignedTeam' header='Id Team' style={{width: '10%'}}/>
                        <Column field='NTaks' header='Tasks Done' style={{width: '10%'}}/>
                        <Column field='UserScore' header='Score' style={{width: '10%'}}/>
                        <Column field='Help' header='Help' style={{width: '10%'}}/>
                    </DataTable>
                </div>
            </>
        );
    }

    //Input handlers
    changeValueEmail = (event) => {
        this.setState({searchValueEmail: event.target.value}, () => {
            this.state.searchValueEmail !== '' ? this.filterByEmail() : this.getUsers();
            this.setState({searchValueAsignedTeam: ''})
        })
    }
    changeValueIdTeam = (event) => {
        this.setState({searchValueAsignedTeam: event.target.value}, () => {
            this.state.searchValueAsignedTeam !== '' ? this.filterByIdTeam() : this.getUsers();
            this.setState({searchValueEmail: ''})
        })
    }

    //Axios requests
    getUsers = () => {
        this.axiosRequest('http://52.0.146.162:80/api/Users')
    }
    filterByEmail = () => {
        this.axiosRequestArray('http://52.0.146.162:80/api/Users?email=' + this.state.searchValueEmail);
    }
    filterByIdTeam = () => {
        console.log(this.state.searchValueAsignedTeam)
        this.axiosRequest('http://52.0.146.162:80/api/Users?idTeam=' + this.state.searchValueAsignedTeam);
    }
    delUser = () => {
        if (this.state.deleteValue !== '') {
            this.advAxiosRequest('http://52.0.146.162:80/api/Users?idUser=' + this.state.deleteValue, 'http://52.0.146.162:80/api/Users', 'User deleted', 'delete')
        } else {
            this.showToast('warn', 'Empty Fields')
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
            this.changeFormatArray(array);
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
                this.showToast('error', 'Server Error');
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
        response.data.forEach(u => u.UserMaster ? u.UserMaster = 'Yes' : u.UserMaster = 'No');
    }
    changeFormatArray = (arr) => {
        console.log(arr)
        arr.forEach(u => u.UserMaster ? u.UserMaster = 'Yes' : u.UserMaster = 'No');
        arr.forEach(u => u.Help ? u.Help = 'Show' : u.Help = 'Hidden');
    }
}

