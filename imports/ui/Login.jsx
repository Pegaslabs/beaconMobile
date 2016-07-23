import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Login extends Component {
    constructor(props) {
        super(props);
       
    }
    
    render() {
        return (
            <div>
                <p>login</p>
                <AccountsUIWrapper/>
            </div>
        );
    }
}

Login.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
    time: PropTypes.object,
};

export default Login;