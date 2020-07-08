const router = require('express').Router();


const authCheck = (req, res, next) => {
    if(!req.user){
        // user is not logged in
        res.redirect('/auth/login');
    }else{
        // if not logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user : req.user});
});

module.exports = router;