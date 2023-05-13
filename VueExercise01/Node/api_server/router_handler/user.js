const db =require('../db/index');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const config = require('../config');


exports.register = (req,res)=>{
    //获取表单信息
    const userinfo = req.body;
    //对表单中数据进行校验
    if(!userinfo.username||!userinfo.password){
        return res.send({status:1,message:'Username or password is illegal'});
    }

    const sqlStr = 'select * from ev_users where username=?';

    db.query(sqlStr,userinfo.username,(err,results)=>{
        //如果执行sql语句失败
        if(err){
            //return res.send({status:1,message:err.message})
            return res.cc(err);
        }
        //判断用户名是否被占用
        if(results.length>0){
            //return res.send({status:1,message:'This username has been used'})
            return res.cc('This username has been used');
        }
        //调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10);
        console.log(userinfo);
        //定义插入新用户的sql语句
        const insertSql = 'insert into ev_users set ?';
        db.query(insertSql,{username:userinfo.username, password:userinfo.password},(err,results)=>{
            //sql语句是否正常执行
            //if(err) return res.send({status:1,message:err.message});
            if(err) return res.cc(err);
            //判断影响行数是否为1
            //if(results.affectedRows !==1) return res.send({status:1,message:'enroll fail'});
            if(results.affectedRows !==1) return res.cc('enroll fail');
            //注册成功
            //res.send({status:0,message:'enroll success'});
            res.cc('enroll success',0)
        })
    })
}

exports.login = (req,res)=>{
    //接收表单数据
    const userinfo =req.body;

    const loginSql = 'select * from ev_users where username = ?';
    db.query(loginSql,userinfo.username,(err,results)=>{
        //sql执行失败
        if(err) return res.cc(err);
        //sql执行成功但获取到多条数据
        if(results.length!==1) return res.cc('login fail');
        
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password);
        if(!compareResult) return res.cc('password is incorrect');
        
        //编辑敏感信息
        const user ={...results[0],password:'',user_pic:''};
        //对用户信息加密，生成token字符串
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expireIn});
        //调用res.send()将token响应给客户端
        res.send({
            status:0,
            message:'login success',
            token:'Bearer '+tokenStr,
        })
    })
    
}
