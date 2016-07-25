import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TextField  from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { currentUser } from '../api/tasks.js';


class Login extends Component {
    constructor(props,context) {
        super(props,context);
        this.login = this.login.bind(this);
        this.state = {
            usernameHint: null,
            passwordHint: null,
            init: null
        };
        
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    login()  {

    //    this.context.router.push('/main');
        
        let username = this.refs.username.getValue();
        let password = this.refs.password.getValue();
        const hint = "This field is required";
        this.setState({ init: 'done' });
        if (username && password) { //the correct login status is that currentUser.username has value while current.password is undefined

            Meteor.call('logins.check', username, password);
            if(this.props.currentUser.username) {
                this.context.router.push('/main');
                this.context.refresh();
            }

        } else {
            if(!username) this.setState({ usernameHint: hint });
            if(!password) this.setState({ passwordHint: hint });
        }
    }


    
    render() {
        
        return (
            <div>
                <div className="loginbar">
                    {
                        (!this.props.currentUser.password) ? null : ((!this.state.init) ? null : <p>No match found</p>)
                    }
                    <TextField floatingLabelText="username" ref="username" errorText={this.state.usernameHint} />
                </div> <br/>
                <div className="loginbar">
                    <TextField floatingLabelText="password" ref="password" errorText={this.state.passwordHint} type="password" />
                </div> <br/>
                <div className="LoginButton"><RaisedButton label="Login" primary={true} onClick={this.login} /></div>
                <p>username:{this.props.currentUser.username}</p>
                <p>password:{this.props.currentUser.password}</p>
            </div>
           
        );
    }
}

injectTapEventPlugin();

Login.propTypes = {
    currentUser: PropTypes.object,
};

Login.contextTypes = {
    router: PropTypes.object
};

Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default createContainer(() => {

    Meteor.subscribe('currrentUser');

    return {
        currentUser: currentUser.findOne(),
    };
}, Login);