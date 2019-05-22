import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {getAllData, getDataCuisine} from "../client/dataClient";


export default class DataContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            response: {},
            value: 'Polish'
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeResponse = this.changeResponse.bind(this);
    }




    async setNewContent(url, value){
        const responses = await getDataCuisine(url, value);
        console.log(responses.data);
        this.setState({
            response : responses.data

        });
        console.log("Response from express ==> ");
        console.log(this.state.response[0]);
    }




    async componentDidMount() {
        await this.setNewContent(this.props.url, this.state.value);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }


    async changeResponse() {
        this.setState({value: ''});
        await this.setNewContent(this.props.url, this.state.value);
    }


    render() {

        if (this.state.response[0]) {
            const keys = Object.keys(this.state.response[0]);
            return (
                <Container>
                        <label>
                            Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                            <button type="button" onClick={this.changeResponse}>Sumbit</button>
                        </label>
                    <Row>{keys.map((data, i) => (
                        <Col key={i} style={{border: "1px solid rgb(0, 0, 0)"}}>
                            {data}
                        </Col>
                    ))}
                    </Row>
                    {this.state.response.map((data, i) => (
                        <Row key={i}>{keys.map((key, index) => (
                            <Col key={index} style={{border: "1px solid rgb(0, 0, 0)"}}>
                                {data[key]}
                            </Col>
                        ))}
                        </Row>
                    ))}
                </Container>
            );
        }
        return (
            <div>Fetching Data</div>
        );
    }
}

