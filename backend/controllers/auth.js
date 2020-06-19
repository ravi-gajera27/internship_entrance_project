const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.signup = (req, res) => {
    if(!req.body.uname || !req.body.email || !req.body.password){
        return res.json({ statusCode:400, message:'data mising' })
    }
  const email = req.body.email;
  const uname = req.body.uname;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        uname: uname
      });
      return user.save();
    })
    .then(result => {
        let payload = {
            email:result.email,
            date: new Date().getDate()
        } 
        let accessToken = jwt.sign(payload,process.env.SECRET_TOKEN);
        res.json({
            statusCode:200,
            message: 'user created successfully',
            token: accessToken
        })
    })
    .catch(err => {
        if(err['code'] == 11000){
            return res.json({ statusCode:409, message:'email conflict' })
        }
        res.json({ statusCode:500, message: 'internal server erroe' })
    });
};

exports.login = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.json({ statusCode:400, message:'data mising' })
    }
    let email = req.body.email;
    User.findOne({email:email})
    .then(result => {
        bcrypt.compare(req.body.password,result.password,(err,result)=>{
            if(err) throw(err);
            else if(!result){
                return  res.json({ statusCode:401, message: 'invalid email or password'})
            }
            else{
                let payload = {
                    email:result.email,
                    date: new Date()
                } 
                let accessToken = jwt.sign(payload,process.env.SECRET_TOKEN);
                res.json({
                    statusCoded:200,
                    message: 'successfully login',
                    token: accessToken
                })
            }
        })
        
    }).catch(err => {
        console.log(err)
        return res.status(500).json({ message: 'internal server error'})
    })
}
    
