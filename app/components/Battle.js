import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('object');
        const value = event.target.value;
        console.log('value: ', value);
        this.setState(() => {
            return {
                username: value
            };
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input id="username"
                    placeholder="github username"
                    type="text"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button 
                    className="button" 
                    type="submit" 
                    disabled={!this.state.username}
                > 
                    Submit
                </button>
            </form>
        )
    }
};

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default class Battle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerOneName  : '',
            playerTwoName  : '',
            playerOneImage : null,
            playerTwoImage : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = `https://github.com/${username}.png?size=200`;
            console.log('newState: ', newState);
            return newState;
        });
    }


    render() {
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        return (
            <div>
                <div className="row">
                    {!playerOneName && 
                        <PlayerInput 
                                id="playerOne" 
                                label="Player One"
                                onSubmit={this.handleSubmit} 
                            /> }
                    {!playerTwoName && 
                        <PlayerInput 
                                id="playerTwo" 
                                label="Player Two"
                                onSubmit={this.handleSubmit} 
                            /> }
                </div>
            </div>
        )
    }
}