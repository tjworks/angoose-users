var ext = require("./extension");
var angoose =require("angoose");

angoose.init(null, {
    'module-dirs':'./test',
    logging:'DEBUG',
    extensions: [ext]
});

var UserModel = require("./user-model");

var u = new UserModel({
    email:'john@demo.com',
    password:'xxx',
    roles:['admin']
});

function setup(cb){
    UserModel.findOne({email:u.email}, function(err, user){
        console.log("Find result", err, user);
        if(user) return cb(user);        
        u.save(function(err){
            console.log("created user");
            cb(u);
        })
    })
}

setup(function(user){
    
    console.log("Got user", user)
    var service = angoose.client().module("LoginService");
    service.signin(u.email, "xxx", function(err, user){
       console.log("Login complete", err, user); 
       
       console.log("\n\n\n######## ")
       console.log(user? "SUCCESS!":"FAILED");
       
       //service.signout(u.email);
    });
    
})
