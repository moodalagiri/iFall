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


    var id = req.query.id;

    var sql1 = "SELECT * FROM patient_details WHERE id="+id;


    db.getData(sql1, function(err, results) {
        if(err) { res.status(500).send("Server Error"); return;}
        // Respond with results as JSON
        if(results.length >0) {

            res.json(results[0]);
        }else{
            res.json(0);
        }

    });



});

router.post("/updateData",function(req,res){
    var parameters = req.body;
   var id=req.body.id;
   console.log(parameters);
    console.log(id);
    var sql = "UPDATE patient_details SET ? WHERE id="+id;
    db.update(sql,parameters, function(err, results) {
        if(err) { res.status(500).send(results); return;}
        // Respond with results as JSON
        res.json(results);


    });

});


module.exports = router;