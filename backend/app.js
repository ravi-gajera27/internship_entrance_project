require('dotenv').config();
let app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const jwt = require('jsonwebtoken');

/* port initialization */
let port = process.env.Port || 3000;

/* connection to mongodb */
mongoose.connect('mongodb://localhost:27017/temp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* set the header */
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization, Content-Length, X-requested-Width');
  next();
});

/* token verification for every user request LIKE [ user/getContact, user/updateContact ]
    except login & signin */
app.all('/user/*Contact', (req,res,next) =>{
  let header = req.headers['authorization'];
  let token = header.split(' ')[1];
  let verify = tokenVrification(token);
  tokenVrification(req.body.token).then(verify =>{
    if(verify == true){
        next();
    }
  }).catch(err =>{
   return res.json({
      statusCode: 401,
      statusLine: 'invalid token'
    })
  })
})

function tokenVrification(token){
  return new Promise((resolve,reject)=>{
    jwt.verify(token, process.env.SECRET_TOKEN, (err, result) => {
      if (err){
        reject(err);
      }
      else{
        resolve(true);
      }
    })
  })
}

/* token verification for unauthorized page */
app.post('/tokenVerification', (req, res) => {
  if (req.body.token) {
    tokenVrification(req.body.token).then(verify =>{
      if (verify == true){
        res.json({
          statusCode: 200,
          statusLine: 'token successfully verified'
        })
      }
    }).catch(err =>{
      res.json({
        statusCode: 401,
        statusLine: 'invalid token'
      })
    })
  }
  else{
    res.json({
      statusCode:400,
      statusLine: 'bad request'
    })
  }
})

/* to process the user request,  request is redirected to the userRoute */
app.use('/user', userRoute);

app.listen(port);