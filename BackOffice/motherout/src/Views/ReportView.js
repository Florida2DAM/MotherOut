import React, {Component} from "react";
import {Chart} from 'primereact/chart'
import axios from "axios";
import {TabPanel, TabView} from "primereact/tabview";


export class ReportView extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            arrayData: [],
            labelGeneralData: ["Users","Teams","Tasks"],
            numUsers: null,
            numTeams: null,
            numTasks: null,
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const generalData = {
            labels: this.state.labelGeneralData,
            datasets: [
                {
                    label: 'Apuestas por días',
                    backgroundColor: '#743380',
                    data: this.state.arrayData
                }
            ]
        };
        const DataUsers = {
            labels: this.state.listLabelsUsers,
            datasets: [
                {
                    label: 'Usuarios por días',
                    backgroundColor: '#743380',
                    data: this.state.listDataUsers
                }
            ]
        };
        let basicOptions = {
            legend: {
                labels: {
                    fontColor: 'White'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: 'White'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: 'White'
                    }
                }]
            }
        };

        return (
            <>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header='General Info'>
                        <div className="card">
                            <Chart type="card" data={generalData} options={basicOptions}/>
                        </div>
                    </TabPanel>
                    <TabPanel header='Altas por día'>
                        <div className="card">
                            <Chart type="line" data={DataUsers} options={basicOptions}/>
                        </div>
                    </TabPanel>
                </TabView>

            </>
        );
    }

    getData = () => {
        axios.get('http://52.0.146.162:80/api/Users').then((response) => {
            this.setState({numUsers: response.data.length})
        }).then(() => {
            axios.get('http://52.0.146.162:80/api/Teams').then((response) => {
                this.setState({numTeams: response.data.length})
            }).then(() => {
                axios.get('http://52.0.146.162:80/api/UserTasks').then((response) => {
                    this.setState({numTasks: response.data.length})
                }).then(() => {
                    this.state.arrayData.push(this.state.numUsers)
                    this.state.arrayData.push(this.state.numTeams)
                    this.state.arrayData.push(this.state.numTasks)
                })

            })
        })
    }
}
