//导入express
const express = require('express');
//创建服务器实例对象
const app = express();

const joi = require('joi');




//导入并配置cors中间件
const cors = require('cors');
app.use(cors());

//配置解析表单数据的中间件(x-www-form-urlencoded)
app.use(express.urlencoded({extended:false}));

//此模块必须在导入路由之前
app.use((req,res,next)=>{
    //status = 0为成功，1为失败 默认为1方便处理失败情况
    res.cc = function(err,status=1){
        res.send({
            status,
            message:err instanceof Error? err.message:err,
        })
    }
    next();
})

//路由之前配置token中间件
const expressJWT = require('express-jwt');
const config = require('./config');
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/\/api/]}));  //unless作用是api开头的路由不需要身份认证

//导入并使用用户路由模块
const userRouter = require('./router/user');
app.use('/api',userRouter);
//导入并使用用户个人信息模块
const userinfoRouter = require('./router/userinfo');
app.use('/my',userinfoRouter);

//定义错误级别中间件
app.use((err,req,res,next)=>{
    //验证失败
    if(err instanceof joi.ValidationError) return res.cc(err);
    //身份认证失败，无权访问
    if(err.name ==='UnauthorizedError') return res.cc('身份认证失败');
    //其他错误
    return cc(err);
})

//启动服务器
app.listen(80,()=>{
    console.log('api server running at http://127.0.0.1');
})