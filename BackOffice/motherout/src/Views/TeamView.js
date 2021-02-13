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

export class TeamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValues: [],
            //Search
            searchValueName: '',
            searchValueIdTeam: '',
            //Delete
            deleteValue: '',
        }
        this.myToast = React.createRef()
    }

    componentDidMount() {
        this.getTeams();
    }

    render() {
        return (
            <>
                <Toast ref={this.myToast}/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='Filter' leftIcon='pi pi-filter'>
                        <div className='p-grid p-fluid'>
                            <RefreshButton onClick={this.getTeams}/>
                            <MotherOutInputText onChange={this.changeValueName} value={this.state.searchValueName}
                                                size={'p-md-3'} name={'Name'}/>
                            <MotherOutInputText onChange={this.changeValueIdTeam}
                                                value={this.state.searchValueIdTeam}
                                                size={'p-md-3'} name={'Id Team'}/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Delete' leftIcon='pi pi-trash'>
                        <div className='p-grid p-fluid'>
                            <RefreshButton onClick={this.getTeams}/>
                            <DeleteButton onClick={this.delTeams}/>
                            <MotherOutInputText onChange={(e) => this.setState({deleteValue: e.target.value})}
                                                value={this.state.deleteValue}
                                                size={'p-md-3'} name={'Id Team'}/>
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
                    </DataTable>
                </div>
            </>
        );
    }

    //Input handlers
    changeValueName = (event) => {
        this.setState({searchValueName: event.target.value}, () => {
            this.state.searchValueName !== '' ? this.filterByName() : this.getTeams();
            this.setState({searchValueIdTeam: ''})
        })
    }
    changeValueIdTeam = (event) => {
        this.setState({searchValueIdTeam: event.target.value}, () => {
            this.state.searchValueIdTeam !== '' ? this.filterByIdTeam() : this.getTeams();
            this.setState({searchValueName: ''})
        })
    }

    //Axios requests
    getTeams = () => {
        this.axiosRequest('http://52.0.146.162:80/api/Teams')
    }
    filterByName = () => {
        this.axiosRequestArray('http://52.0.146.162:80/api/Teams?name=' + this.state.searchValueName);
    }
    filterByIdTeam = () => {
        this.axiosRequest('http://52.0.146.162:80/api/Teams?TeamId=' + this.state.searchValueIdTeam);
    }
    delTeams = () => {
        if (this.state.deleteValue !== '') {
            this.advAxiosRequest('http://52.0.146.162:80/api/Teams?TeamId=' + this.state.deleteValue, 'http://52.0.146.162:80/api/Teams', 'Team deleted', 'delete')
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
}

