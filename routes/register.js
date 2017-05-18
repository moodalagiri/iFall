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


router.post('/', function (req, res) {
    console.log("Client request");
    console.log(req.body);
    db.register(req.body, function(err,result){
        if(err){
            res.json("Error");
    }else{

            res.json(result);
        }
    });

});

module.exports = router;