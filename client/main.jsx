import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


import '../imports/startup/accounts-config.js'
import App from '../imports/ui/App.jsx';
import shake from '../imports/api/shake.js'

function onDeviceReady() {
    console.log(navigator.accelerometer);
}

function onShake() {
    ibeacon.showMessage("shaked");
}

Meteor.startup(() => {
    ibeacon.showMessage("It works!!!");
    document.addEventListener("deviceready", onDeviceReady, false);
    shake.startWatch(onShake, 30);
    render(<App />, document.getElementById('render-targer'));
});