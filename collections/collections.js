import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

let logins = new Mongo.Collection('logins');
logins.insert({username: '', password: ''});

export const Tasks = new Mongo.Collection('tasks');
export const Logins = logins;
export const currentUser = new Mongo.Collection('currentUser');




