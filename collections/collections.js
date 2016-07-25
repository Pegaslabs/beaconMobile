import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const Tasks = new Mongo.Collection('tasks');
export const Logins = new Mongo.Collection('logins');
export const currentUser = new Mongo.Collection('currentUser');