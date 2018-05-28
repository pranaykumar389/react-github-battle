import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/battle" component={Battle} />
                        <Route path="/popular" component={Popular} />
                        <Route render={() => <h3>Not Found!</h3>} />
                    </Switch>
                </div>
            </Router>
        );
    }
}