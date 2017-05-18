var mysql      = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manasa',
    database: 'falldetection',
    connectionLimit: 100,
    supportBigNumbers: true
});


exports.register = function(arr, callback){
    var sql = "INSERT into patient_details SET ?";

    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};
exports.authenticate = function(email,password, callback) {
    var sql = "SELECT * FROM patient_details where email =? and password =? ";
    // get a connection from the pool
    var arr =[email,password];
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, arr, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.getData = function(query,callback){
    var sql = query;
    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql,function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};

exports.update = function(sql,arr, callback){

    console.log(sql);
    pool.getConnection(function(err, connection){
        if(err){console.log(err); callback(true); return;}

        connection.query(sql, arr, function(err, results){
            connection.release();
            if(err) { console.log(err); callback(true,err); return; }
            callback(false, results);

        });
    });
};