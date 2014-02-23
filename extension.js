var angoose = require("angoose");
var options = require("./options"); 

module.exports = {
    name: options.EXTENSION,
    preAuthorize: preAuth,
    preSerializeModules: serializeModulesInterceptor
};

function preAuth(next){
    logger().trace("in preAuth" );
    next();
};
function logger(){
    var extensionOptions = angoose.config()[options.EXTENSION] ;
    angoose.getLogger('angoose-users').setLevel((extensionOptions && extensionOptions.logging) || 'DEBUG');
    return angoose.getLogger('angoose-users')
}  
function serializeModulesInterceptor(next ){
    logger().debug("Injecting service modules" );

    // load user model
    require("./user-model");
    // load service modeul
    require("./login-service")    
     
    next();
};
