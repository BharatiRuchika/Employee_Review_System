const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/users")

// Configure the LocalStrategy for username and password authentication
passport.use(new LocalStrategy({
        usernameField:'email',    // The username field is expected to be an email
    },
    function(email,password,done){
        // Check if a user with the provided email exists and the password matches
        User.findOne({email:email}).then(async(user)=>{
            if(!user){
                return done(null,false)   
            }
            if(user.role=="Employee"){
                const isPasswordMatch = await user.comparePassword(password)
                if(!isPasswordMatch){
                    return done(null,false) 
                }
                return done(null,user)    // Authentication successful
            }else{
                if(!(password==user.password)){
                    return done(null,false) 
                }
                return done(null,user)
            }
        }).catch((error)=>{
            console.log('error',error)
            return done(error)
        })
    }
))

// Serialize user information to the session
passport.serializeUser(function(user,done){
    done(null, user.id)
})

// Deserialize user from the session
passport.deserializeUser(function(id,done){
    User.findById(id).then((user)=>{
        return done(null,user)
    }).catch((error)=>{
        console.log('error in finding user')
        return done(error)
    })
})

// Custom middleware to check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next()       // User is authenticated, proceed to the next middleware
    }
    return res.redirect('/api/v1/auth/sign-in')    // Redirect to the sign-in page if not authenticated
}

passport.checkEmployeeAuthentication = function(req, res, next){
    if(req.isAuthenticated() && req.user.role=="Employee"){
        return next()
    }
    return res.redirect('/api/v1/auth/sign-in')
}

passport.checkAdminAuthentication = function(req, res, next){
    console.log('im in admin authentication')
    console.log('user',req.user)
    if(req.isAuthenticated() && req.user.role=="Admin"){
        return next()
    }
    return res.redirect('/api/v1/auth/sign-in')
}

// Custom middleware to set authenticated user data and additional data for views
passport.setAuthenticatedUser = async function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user    
    }
    next()    
}

// Export the Passport configuration
module.exports = passport