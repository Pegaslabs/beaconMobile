import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/*var database;

if (Meteor.isServer) {
    database = new MongoInternals.RemoteCollectionDriver('mongodb://databoy:databoy@ds011314.mlab.com:11314/beaconbarn');
}

export const Logins = new Mongo.Collection('logins', { _driver: database });

if (Meteor.isServer) {
    Meteor.publish('logins', function loginsPublication() {
        return Logins.find({});
    });
}


Meteor.methods({
    
    'logins.check'(username, password) {

        let user = username;
        let pw = password;
        const loginfo = { username: '', password: '' };

        Logins.findOne({ username: user }).exec((err, result) => {

            let user;
            let pass;
            if(!result) { user = ''; pass = 'no such user'; }
            else if(pw != result.password) { user = ''; pass = 'wrong password'; }
            else { user = result.username; pass = result.password; }

            loginfo.username = user;
            loginfo.password = pass;

        });
        
        console.log('here');

     //   return loginfo;

    }
    
}); */