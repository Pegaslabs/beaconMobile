import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Url = new Mongo.Collection(null);

Meteor.methods({
    'url.insert'(name) {
        Url.insert({id:'addr',url: name});
    },
    'url.update'(name) {
        Url.update({id:'addr'},{ $set: {url: name} });
    }
});