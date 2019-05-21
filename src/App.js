import React, { Component } from "react";
import DataContainer from './component/DataContainer'



class App extends Component {

    render() {

        return (
            <div>
                <h1 style={{textAlign : 'center'}}>MongoDB</h1>
                <DataContainer url="/" />
            </div>
        );
    }
}



export default App;
