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

router.get("/", function(req, res) {




    var sql1 = "SELECT age FROM patient_details" ;


    db.getData(sql1, function(err, results) {
        console.log(results);
        if(err) { res.status(500).send("Server Error"); return;}
        if(results.length >0) {

            res.json(results);
        }else{
            res.json(0);
        }

    });



});

module.exports = router;