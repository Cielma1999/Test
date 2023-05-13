var mysql = require('mysql2');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'login'
})

connection.connect();

var sql = 'select * from test_tbl';

connection.query(sql,function(err,result){
    console.log(result);
})
