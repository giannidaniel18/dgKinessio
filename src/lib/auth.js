module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash ('warning','Para realizar esta función requiere autenticarse')
        return res.redirect('/users/signin')
    },
    isNotLoggedIn (req,res,next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/')
    }
}