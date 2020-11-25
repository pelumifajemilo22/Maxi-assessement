const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./configuration/app');
const User = require('./models/user');

//Json web Token Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
      secretOrKey: config.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // if user does't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      } 
    }  
  )
);

//Google OAUTH STrategy
passport.use('googleToken', new GooglePlusTokenStrategy({
clientID:'config.oauth.google.clientID',
clientSecret: 'config.oauth.google.clientSecret'
}, async (accessToken, refreshToken, profile, done)=>{

    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
    
        //check whether this current user exists in our database
        const existingUser = await User.findOne({"google.id": profile.id});
        if (existingUser){
            console.log('User already exists in our Db')
            return done(null, existingUser);
        }
        console.log('User  does not exist, we are creating a new one')    
    
        // If new Account
        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id, 
                email: profile.emails[0].value  
            }
        });
    
        await newUser.save();
        done(null, newUser)
    

    } catch(error){ 
        done (error, false, error.message) 
    }
   

}));

//Facebook strategy

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done)=>{
    try{

        console.log('profile', profile)
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)

        const existingUser = await User.findOne({"facebook.id": profile.id});
        if(existingUser){
            return done(null, existingUser);

        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        done(false, newUser);

    } catch(error){
        done(error, false, error.message);
    }
}))

// Local Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });
        // if not, handl it 
        if (!user) {
          return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        //if not, handle it
        if (!isMatch) {
          return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
