const User = require('../../../models/users')
module.exports.sign_in = async function(req,res){
    try{
       console.log('im in sign in')
    
        // Render the sign-in page
        return res.render('sign_in',{
            title:"ERS | Signin"
        })
    }catch(error){
        console.log('error',error)
    }
}

module.exports.sign_up = async function(req,res){
    try{
       console.log('im in sign up')
    
        // Render the sign-in page
        return res.render('sign_up',{
            title:"ERS | Signup"
        })
    }catch(error){
        console.log('error',error)
    }
}


module.exports.create = async function(req,res){
    try{
        console.log('body',req.body)
        const {fullName,email,password,confirmPassword} = req.body
        
        // Check if the password matches the confirmation
        if(password!=confirmPassword){
            console.log('im in diffreen')
            req.flash('error','entere password again')
            return res.redirect('/api/v1/auth/sign-up')
        }   
        
        // Check if the user already exists
        const user = await User.findOne({email})
        console.log('user',user)
        if(!user){
            // Create a new user
            const data = await User.create({
                fullName,
                email,
                password,
            })
        
            // Flash a success message and redirect
        req.flash('success','sign up successfully')
        return res.redirect('/')
    }else{
        // Flash an error message and redirect to sign-up page
        req.flash('error','User already present')
        return res.redirect('/api/v1/auth/sign-up')
    }
    }catch(error){
        console.log('error',error)
    }
}

// Create User Session (Log In)
module.exports.createSession = async function(req,res){
    try{
        console.log('im in create-session')
        // Flash a success message and redirect to the homepage
        req.flash('success','logged in successfully')
        return res.redirect('/')
    }catch(error){
        console.log("*******",error)
        return res.status(401).json({
            message:'Internal Server Error'
        })
    }
}