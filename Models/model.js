module.exports.User = function (source) {
    if (source === undefined || source == null) {
        this.clear();
    } else {
        this.initialize(source);
    }
}

module.exports.User.prototype = {
    clear: function () {
        this.id = 0;
        this.firstname = null;
        this.lastname = null;
        this.mobilenumber = null;
        this.altmobilenumber = null;
        this.email = null;
        this.gender = null;
        this.hobbies = { 
            "reading" : false,
            "playing_games" : false,
            "travelling" : false
        };
        this.street1 = null;
        this.street2 = null;
        this.country = null;
        this.state = null;
        this.zip = null;
        this.createdat = 0;
        this.modifiedat = 0;
    },
    initialize: function (source) {
        this.id = source.id;
        this.firstname = (source.firstname != undefined) ? source.firstname : null;
        this.lastname = (source.lastname != undefined) ? source.lastname : null;
        this.mobilenumber = (source.mobilenumber != undefined) ? source.mobilenumber : null;
        this.altmobilenumber = (source.altmobilenumber != undefined) ? source.altmobilenumber : null;
        this.email = (source.email != undefined) ? source.email : null;
        this.gender = (source.gender != undefined) ? source.gender : null;
        this.hobbies = { 

            "reading" : (source.hobbies != undefined && source.hobbies.reading != undefined) ? source.hobbies.reading : false,
            "playing_games" : (source.hobbies != undefined && source.hobbies.playing_games != undefined) ? source.hobbies.playing_games : false,
            "travelling" : (source.hobbies != undefined && source.hobbies.travelling != undefined) ? source.hobbies.travelling : false

        };
        this.street1 = (source.street1 != undefined) ? source.street1 : null;
        this.street2 = (source.street2 != undefined) ? source.street2 : null;
        this.country = (source.country != undefined) ? source.country : null;
        this.state = (source.state != undefined) ? source.state : null;
        this.zip = (source.zip != undefined) ? source.zip : null;
        this.createdat = (source.createdat != undefined) ? source.createdat : 0;
        this.modifiedat = (source.modifiedat != undefined) ? source.modifiedat : 0;
    }
}