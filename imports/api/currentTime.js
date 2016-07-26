import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Url = new Mongo.Collection('url');

//if (Meteor.isServer) {
    Meteor.publish('url', function urlPublication() {
        return Url.find({});
    });
//}

Meteor.methods({
    'url.insert'(name) {
        Url.insert({id:'addr',url: name});
    },
    'url.update'(name) {
        Url.update({id:'addr'},{ $set: {url: name} });
    }
});





/*const currentTime = {
    time: 'test1.jpg',
    setTime: function(newtime) {
        currentTime.time = newtime;
        console.log(currentTime.time);
    },
    getTime: function() {
        return currentTime.time;
        console.log('get' + currentTime.time);
    }
};


export default currentTime;

if (Meteor.isServer) {
    Meteor.publish('url', function urlPublication() {
        return currentTime.getTime();
    });
}*/