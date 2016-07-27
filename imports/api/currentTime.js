import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Url = new Meteor.Collection('url');

/*if (Meteor.isCordova) {
    Meteor.publish('url', function urlPublication() {
        return Url.find({});
    });
}*/

Meteor.methods({
    'url.insert'(name) {
        Url.insert({id:'addr',url: name});
    },
    'url.update'(name) {
        Url.update({id:'addr'},{ $set: {url: name} });
    }
});