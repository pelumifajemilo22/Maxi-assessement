const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration/app')


signToken = user =>{

    return JWT.sign({
        iss: 'Fooddash',
        sub: user.id,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahed
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next)=>{
        //email & passowrd
        const {email, password} = req.value.body;
        //check if there user with the same email
        const foundUser = await User.findOne({"local.email": email})

        if(foundUser) {
           return res.status(403).send({error: 'Email is already in use'})
        }

        //Create new user
          const newUser = new User({ 
            method: 'local',
            local:{
                email:email,
                 password:password 
            }
            });
         await  newUser.save();
        // Generate the token
        const token = signToken(newUser)

            //respond with token
            res.status(200).json({token})
         },

    signIn: async (req, res, next)=>{
        //Generate tokens 

       const token = signToken(req.user);
       res.status(200).json({token});

    },

    googleOAuth: async (req, res, next) =>{
        //generate token
        console.log('req.user', req.user);
        const token = signToken(req.user)
        res.status(200).json({token})
    },

    facebookOAuth: async (req,res, next) =>{
        console.log('Got here') 
        console.log('req.user', req.user);
        const token = signToken(req.user)
        res.status(200).json({token})
    },

    secret: async (req, res, next)=>{
        console.log('I managed to get here!')
        res.json({secret: 'resource'})
    }
} 