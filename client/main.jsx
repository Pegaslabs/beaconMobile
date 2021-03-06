import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import shake from '../imports/api/shake.js';

import { renderRoutes } from '../imports/startup/routes.js';

function onDeviceReady() {
    console.log(navigator.accelerometer);
}

function onShake() {
    ibeacon.showMessage("shaked");
    ibeacon.showBeacon("herere");

    const time = new Date();
    let minute = time.getUTCMinutes(), second = time.getUTCSeconds();
    let min = '', sec = '';
    
    if(minute < 10)  min = '0' + minute.toString();
    else min = minute.toString();
    
    if(second < 10)  sec = '0' + second.toString();
    else sec = second.toString();
        
    let name = min + sec + '.jpg';
    window.localStorage.store = name;
    Meteor.call('url.update', name);
}

Meteor.startup(() => {

    if (Meteor.isCordova) {
        ibeacon.showMessage("It works!!");
        document.addEventListener("deviceready", onDeviceReady, false);
        shake.startWatch(onShake, 30);
    }

    Meteor.call('url.insert', 'test1.jpg');

    render(renderRoutes(), document.getElementById('render-target'));
});