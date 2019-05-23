import React from 'react';
import {tryLogin} from "../client/dataClient";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          username : "",
          password : ""
        };
        this.handleLogin = this.handleLogin.bind(this);
    }


    async handleLogin(){
        const response = await tryLogin(this.state.username, this.state.password);
        console.log(response);
    }

    render() {
            return (
                <div>
                    Login Page

                    <label>
                        USERNAME
                    </label>
                    <input onChange={(e) => {
                        this.setState({
                            username : e.target.value
                        })
                    }} />

                    <label>
                        PASSWORD
                    </label>
                    <input onChange={(e) => {
                        this.setState({
                            password : e.target.value
                        })
                    }} />

                    <button onClick={this.handleLogin}>
                        Login
                    </button>
                </div>
            );
    }
}

