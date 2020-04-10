var express = require('express');
var router = express.Router();
const UserModel = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ data: "Hello world" });
});
router.post('/login', function(req, res, next) {
    UserModel.login({username: req.body.username, password: req.body.password}, (modelRes) => {
        if (modelRes.error)
            res.status(modelRes.error.code ? modelRes.error.code : 500)
        else
            req.session.username = req.body.username;
        res.json(modelRes)
    })
});

router.post('/signup', function(req, res, next) {
    const signupData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    }
    const validMess = UserModel.validUsername(signupData.username);
    if (validMess.error) {
        res.status(validMess.error.code ? validMess.error.code : 500);
        res.json(validMess);
    }
    // else if (!UserModel.validPassword(req.body.password))
    //     res.json({ message: "Your password must be between 8 to 32 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character." ,textColor:'color:red'});
    else 
        UserModel.create(signupData, (modelRes) => {
            if (modelRes.error)
                res.status(modelRes.error.code ? modelRes.error.code : 500);
            res.json(modelRes);
        })
});


module.exports = router;
