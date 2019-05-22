import React, { Component } from "react";
import DataContainer from './component/DataContainer'
import {getAllData, getDataCuisine} from "./client/dataClient";
import ReactListInput from "react-list-input"

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            filter: {},
            currentCuisine : [],
            currentInput : "",
            km: 5,
            cuisine: [],
            grade: 10
        };

        this.StagingItem = this.StagingItem.bind(this);
        this.Item = this.Item.bind(this);
        this.updateCuisine = this.updateCuisine.bind(this);
        this.handleResearch = this.handleResearch.bind(this);
    }

    async updateCuisine(value){
        if (value.length > 0) {
            const response = await getDataCuisine('/loadCuisine', value);
            this.setState({
                currentCuisine : response.data
            });
            console.log(this.state.currentCuisine)
        }
        else {
            this.setState({
                currentCuisine : {}
            });
        }
    }

    Item ({decorateHandle, removable, onChange, onRemove, value}) {
        return (
            <div>
                {decorateHandle(<span style={{cursor: 'move'}}>+</span>)}
                {' '}
                <span
                    onClick={removable ? onRemove : x => x}
                    style={{
                        cursor: removable ? 'pointer' : 'not-allowed',
                        color: removable ? 'black' : 'gray'
                    }}>X</span>
                {' '}
                <input value={value} onChange={(e) => {
                    onChange(e.target.value);
                    this.updateCuisine(e.target.value);
                }} />
            </div>
        )
    }

    StagingItem ({value, onAdd, canAdd, add, onChange}) {
        return (
            <div>
                <span
                    onClick={canAdd ? onAdd : undefined}
                    style={{
                        color: canAdd ? 'black' : 'black',
                        cursor: canAdd ? 'pointer' : 'not-allowed'
                    }}>
                    Add
                </span>
                {' '}
                <input value={value} onChange={(e) => {
                    onChange(e.target.value);
                    this.updateCuisine(e.target.value);
                }} />
            </div>
        )
    }

    async setNewContent(url, filter){
        const responses = await getAllData(url, filter);
        console.log(responses.data);
        this.setState({
            data : responses.data,
            cuisine: []

        });
        console.log("Response from express ==> ");
        console.log(this.state.data[0]);
    }

    async componentDidMount() {
        await this.setNewContent('/loadData', this.state.filter);
    }

    async handleResearch(event){
        await this.setState({
            filter: {
                km : this.state.km,
                cuisine : this.state.cuisine,
                grade : this.state.grade,
            }
        });
        await this.setNewContent('/loadData', this.state.filter);
    }

    render() {
        if (this.state.data[0]) {
            console.log(this.state)
            return (
                <div>
                    <h1 style={{textAlign: 'center'}}>MongoDB</h1>
                    <div style={{border: "1px solid rgb(0, 0, 0)"}}>
                    <label>
                        How Far (in KM):
                        <input type="text" onChange={(event) => {
                            this.setState({km: parseInt(event.target.value, 10)});
                        }}/>
                    </label><br/>
                    <label>
                        How Grade from 0 to 100 (closest to 0 is better):
                        <input type="text" onChange={(event) => {
                            this.setState({grade: parseInt(event.target.value, 10)});
                        }}/>
                    </label><br/>
                    <ReactListInput
                        initialStagingValue=''
                        onChange={value => this.setState({cuisine : value,  currentCuisine : {}})}
                        maxItems={10}
                        minItems={0}
                        ItemComponent={this.Item}
                        StagingComponent={this.StagingItem}
                        value={this.state.cuisine}
                    />
                    <DataContainer data={this.state.currentCuisine}/>
                    <button onClick={this.handleResearch}>
                        Search
                    </button>
                    </div><br/>
                    <DataContainer data={this.state.data}/>
                </div>
            );
        }
        return (
            <div>Fetching Data</div>
        );
    }
}

