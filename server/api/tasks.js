import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Tasks, Logins, currentUser } from '../../collections/collections.js';

if (Meteor.isServer) {

    Meteor.publish('logins', function loginsPublication(user,pw) { // logins collection which is connected to external db
        return Logins.find({ username: user, password: pw});
    });
}


Meteor.methods({ 

    'tasks.insert'(text) {
        check(text, String);
        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.users.findOne(this.userId).username
        })
    },

    'tasks.remove'(taskId) {
        check(taskId, String);

        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Tasks.remove(taskId);
    },

    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);
        const task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        Tasks.update(taskId, { $set: { checked: setChecked } });
    },

    'tasks.setPrivate'(taskId, setToPrivate) {
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    }

});

/* 'logins.check'(username, password) {

 let pw = password;
 let res = Logins.findOne({ username: username });
 let obj = Logins.find({}).count();

 console.log('collection:' + obj);

 console.log('enter:'+username);
 let user;
 let pass;
 if(!res) { user = ''; pass = 'no such user'; console.log('nullres'); }
 else if(pw != res.password) { user = ''; pass = 'wrong password'; }
 else { user = res.username; pass = ''; }
 },*/