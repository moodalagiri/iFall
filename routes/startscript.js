var express = require('express');
var router = express.Router();

//Post to start python script
router.get('/', function(req, res, next) {
    // Use python shell (npm install python-shell)
    var PythonShell = require('python-shell');

//Set you options for more complex usecases
    var options = {
        mode: 'text'
    };

//Call helloworld.py
    PythonShell.run('test.py', options, function (err, results) {

        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
    });

//Send back a sample hello world
    res.send("Hello World");
});

module.exports = router;

