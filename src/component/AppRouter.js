import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from '../App';
import Login from './Login';


function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login/">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Route path="/" exact component={App} />
                <Route path="/login/" component={Login} />
            </div>
        </Router>
    );
}

export default AppRouter;