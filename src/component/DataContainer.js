import React from 'react';
import { Container, Row, Col } from 'react-grid-system';


export default class DataContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.data[0]) {
            const keys = Object.keys(this.props.data[0]);
            return (
                <Container>
                    <Row>{keys.map((data, i) => (
                        <Col key={i} style={{border: "1px solid rgb(0, 0, 0)"}}>
                            {data}
                        </Col>
                    ))}
                    </Row>
                    {this.props.data.map((data, i) => (
                        <Row key={i}>
                            {keys.map((key, index) => (
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

