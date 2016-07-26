import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TextField  from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Logins } from '../../collections/collections.js';


class Login extends Component {
    constructor(props,context) {
        super(props,context);
        this.login = this.login.bind(this);
        this.state = {
            usernameHint: null,
            passwordHint: null,
            username: null,
            password: null
        };
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

  /*  static contextTypes = {
        router: PropTypes.object
    }*/

    login()  {
        
        let username = this.refs.username.getValue();
        let password = this.refs.password.getValue();
        const hint = "This field is required";
        if (username && password) { //the correct login status is that currentUser.username has value while current.password is undefined

            let self = this;
            Meteor.subscribe('logins',username,password, function onReady() {

                let obj = Logins.findOne();
                console.log('login');
                if(obj) {
                    console.log('username: '+ obj.username);
                    self.setState({ username: obj.username });
                    self.setState({ password: obj.password });
              //      self.props.history.push('/main');
                    self.props.history.pushState(null, '/main');
              //      self.context.router.push('/main');
               //     browserHistory.push('/main');
               //     window.location.reload(true);

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
                        (!this.state.username) ? null : <p>No match found</p>
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
    currentuser: PropTypes.object.isRequired
};

Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default createContainer(() => {
    
    return {
        currentUser: Logins.findOne()
    };
}, Login);