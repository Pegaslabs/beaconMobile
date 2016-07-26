import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TextField  from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { currentUser, Logins } from '../../collections/collections.js';


class Login extends Component {
    constructor(props,context) {
        super(props,context);
        this.login = this.login.bind(this);
        this.state = {
            usernameHint: null,
            passwordHint: null,
            init: null,
            username: null,
            password: null
        };
        
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    login()  {
        
        let username = this.refs.username.getValue();
        let password = this.refs.password.getValue();
        const hint = "This field is required";
        this.setState({ init: 'done' });
        if (username && password) { //the correct login status is that currentUser.username has value while current.password is undefined

            let self = this;
           // Meteor.call('logins.check', username, password);
            Meteor.subscribe('logins',username,password, function onReady() {

                let obj = Logins.findOne();
                console.log('login');
                if(obj) {
                    console.log('username: '+ obj.username);
                    self.setState({ username: obj.username });
                    self.setState({ password: obj.password });
                    self.context.router.push('/main');
                } else {
                    self.setState({ password: 'no match found' });
                }
            });

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
                        (!this.state.password) ? null : <p>No match found</p>
                    }
                    <TextField floatingLabelText="username" ref="username" errorText={this.state.usernameHint} />
                </div> <br/>
                <div className="loginbar">
                    <TextField floatingLabelText="password" ref="password" errorText={this.state.passwordHint} type="password" />
                </div> <br/>
                <div className="LoginButton"><RaisedButton label="Login" primary={true} onClick={this.login} /></div>
                <p>username:{this.state.username}</p>
                <p>password:{this.state.password}</p>
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
    
    return {
        currentUser: Logins.findOne(),
    };
}, Login);