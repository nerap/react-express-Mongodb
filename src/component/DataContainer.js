import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import {getAllData} from "../client/dataClient";


export default class DataContainer extends React.Component {

    state = {
        response: {}
    };

    async componentDidMount() {
        const responses = await getAllData(this.props.url);
        this.setState({
                    response : [
                        responses.data
                    ]
                });
        console.log("Response from express ==> ");
        console.log(this.state.response[0]);
    }



    render() {

        if (this.state.response[0]) {
            const keys = Object.keys(this.state.response[0]);
            return (
                <Container>
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

