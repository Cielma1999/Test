/* 中间件，用来操作mysql */

const express = require('express');
const app = express();
const mysql = require('./db/db');

mysql.connect();


app.get('/query',function(req,res){
    //连接
    
    
    var sql = 'select * from test_tbl';
    //查
    mysql.query(sql,function(err,result){
        console.log(result);
        res.send(result);
    })
    //关闭
    //mysql.end();
})

app.get('/insert',function(req,res){
    let name = req.query.name;
    let job = req.query.job;
    var insertSql = 'insert into test_tbl (user_name,user_job,submit_date) values (?,?,NOW())';
    mysql.query(insertSql,[name,job],(err,result)=>{
        res.send(true);
    })
})

app.get('/del',(req,res)=>{
    let id = req.query.delID;
    var delSql = 'delete from test_tbl where user_id = ?';
    mysql.query(delSql,id,(err,result)=>{
        res.send(true);
    })
})

app.get('/search',(req,res)=>{
    let content = req.query.sKey;
    let searchSql = 'select user_name,user_job from test_tbl where user_name like "%'+content+'%" or user_job like "%'+content+'%" '
    mysql.query(searchSql,(err,result)=>{
        res.send(result); 
    })
})

app.get('/search-id',(req,res)=>{
    let id = req.query.sId;
    let searchIdSql = 'select * from test_tbl where user_id = ? '
    mysql.query(searchIdSql,id,(err,result)=>{
        res.send(result); 
    })
})

app.get('/confirm',(req,res)=>{
    let id = req.query.mId;
    let job = req.query.mjob;
    let confirmSql = 'update test_tbl set user_job = ? where user_id = ? '
    mysql.query(confirmSql,[job,id],(err,result)=>{   //此处把两个参数用[]包起来不容易报错
        res.send(true); 
    })
})

app.get('/check',(req,res)=>{
    let check = req.query.checkName;
    let checkSql = 'select * from test_tbl where user_name = ?  '
    mysql.query(checkSql,check,(err,result)=>{   
        res.send(result); 
    })
})

app.listen(8081,()=>{
    console.log('http://127.0.0.1:8081 端口监听中');
})