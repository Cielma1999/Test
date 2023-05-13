const mysql = require('mysql2');//mysql8.0以上不兼容mysql模块，所以用mysql2

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'node_test',
})

//测试
/* db.query('select 1',(err,result)=>{
    if(err) return console.log(err.message);
    console.log(result);
})  */

//查询数据
/* const sqlstr = 'select * from user'
db.query(sqlstr,(err,result)=>{
    if(err) return console.log(err.message);
    console.log(result);
}) */

//添加数据
const user = {name: 'spider', age:13}

const sqlStr = 'insert into user (name,age) values(?,?)';

db.query(sqlStr,[user.name,user.age],(err,result)=>{
    if(err) return console.log(err.message);
    console.log(result);
    if(result.affectedRows===1){
        console.log('插入成功');
    }
})