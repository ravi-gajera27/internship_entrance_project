let authModel = require('../../models/customer/auth.model');
const jwt = require('jsonwebtoken');

/* user signin */

module.exports.userSignin = (req,res) => {
    if(!req.body.uname || !req.body.email || !req.body.password){
        return res.json({
            statusCode:400,
            statusLine:'bad request'
        })
    }

    let user = req.body;

    authModel.user_signup(user).then(result => {
        if(result){
            let payload = {
                email:result.email,
                date: new Date()
            } 
            let accessToken = jwt.sign(payload,process.env.SECRET_TOKEN);
            res.json({
                statusCode:201,
                statusLine:'successfully created',
                token:accessToken
            })
        }
    }).catch(err => {
        if(err['code'] == 11000){
            res.json({
                statusCode:409,
                statusLine:'email conflict'
            })
        }
        
    })

}