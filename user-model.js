var angoose =require('angoose');
var mongoose = angoose.getMongoose();
var options = require("./options");

var UserSchema = new mongoose.Schema({
                email: {type: String, required: true, label: 'Email', match:[/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i, "Email is not valid"], unique:true},
                name: {
                    prefix: {type: String, label: 'Prefix' },
                    first: {type: String,   label: 'First Name' },
                    middle: {type: String, label: 'Middle Name'},
                    last: {type: String,   label: 'Last Name'  },
                    suffix: { type:String, label:'Suffix' },
                    full: {type: String,   label:'Full Name' }
                },
                status: {
                    type: String,
                    required: true,
                    label: 'Status',
                    enum:['active','inactive','disabled','archived'],
                    default:'active'
                },
                password: {
                    hash: {type:String, editable:false},
                    salt: {type:String, editable:false}
                },
                roles:[{type:String}]
        } , {collection: options.COLLECTION_NAME});
 
module.exports =  mongoose.model( options.MODEL_NAME, UserSchema);



