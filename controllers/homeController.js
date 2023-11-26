module.exports.home = async function (req, res) {
    try{
        if(req.user.role=="Admin"){
            return res.redirect("/api/v1/admin/home");
        }else if(req.user.role=="Employee"){
            return res.redirect("/api/v1/users/home");
        }
    }catch(error){
        console.log('error',error)
    }
    
  }