 /** @module AccountService */

var angoose =require('angoose');
var UserModel = require("./user-model");
var service = {};

function logger(){
    return angoose.getLogger("angoose-users");
}
/**
 * User login
 * 
 */
service.signin = function(username, password, $callback){
     var $context = angoose.getContext();
     if (! username || ! password) return $callback("Must provide username/password");
     
     UserModel.findOne({"email":  username },  function(err, user) {
                if (err) return $callback(err);
                if(!user) return $callback("Username/password do not match.");
                logger().debug("User login: ", username, password && password.length, user.get("password.salt"))
                
                // for testing, no password check
                /**
                // check password hash
                if(crypto.pbkdf2(password) === user.password.hash) return $callback("Username/password does not match");
                */
                
                // angoose's requirements: for successful login, return an object with userId & roles property
                var ret = {
                    userId: user._id,
                    roles: user.roles
                }               
                
                $callback(false, ret);
        }); // end inContext
}

/** 
 * Signout
 * 
 */
service.signout = function(  $callback){
    var $context = angoose.getContext();
    $context.getRequest().session.destroy();
    $callback(false);
}
 

module.exports = angoose.module('LoginService', service);
