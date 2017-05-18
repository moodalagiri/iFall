var express = require('express');
var router = express.Router();
var db = require('./database');
var bodyParser = require('body-parser');
var cors = require('cors'); //required for cross origin request
router.use(cors()   );
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(function(req, res, next) {

    next();
});


router.get('/', function(req, res) {

    var email = req.query.email;
    var password = req.query.password;
    console.log(email+" "+password);
    db.authenticate(email,password, function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        else{

            res.json(results);
        }

    });

});
module.exports = router;