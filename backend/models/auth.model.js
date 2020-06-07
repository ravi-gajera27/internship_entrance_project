let mongoose = require('mongoose');

/* schema for user signin */
let userSchema = mongoose.Schema({
    uname:{type:String, require:true},
    email:{type:String, unique:true, require:true},
    password:{type:String, minlength:8, maxlength:20, require:true},
})

/* model for user schema */
let authModel = module.exports = mongoose.model('user_auth', userSchema);

/* action on authmodel */

/* signin */
module.exports.user_signin = (user) => {
    return new Promise((resolve,reject) => {
        authModel.create(user,(err,result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

/* login */
module.exports.user_login = (user) => {
    return new Promise((resolve,reject) => {
        authModel.findOne(user,(err,result) => {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}