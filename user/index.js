var db = require('../db');
function User(name)
{
    this.name=name;
}

db.connect();

User.prototype.hello = function(who){
     console.log(db.getPhrase("Hello") + ", " + who.name);
};

module.exports = User;