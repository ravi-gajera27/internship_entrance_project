let authModel = require('../../models/customer/auth.model');
const jwt = require('jsonwebtoken');

/* user login */

module.exports.userLogin = (req,res) => {
    if(!req.body.email || !req.body.password){
        return res.json({
            statusCode:400,
            statusLine:'bad request'
        })
    }

    let user = req.body;

    authModel.customer_login(user).then(result => {
        if(result){
            let payload = {
                email:result.email,
                date: new Date()
            } 
            let accessToken = jwt.sign(payload,process.env.SECRET_TOKEN);
            res.json({
                statusCode:200,
                statusLine:'successfully login',
                token:accessToken
            })
        }
        else{
            res.json({
                statusCode:401,
                statusLine:'invalid email or password'
            })
        }
    }).catch(err => {
        res.json({
            statusCode:500,
            statusLine:'internal server error'
        })
    })
}