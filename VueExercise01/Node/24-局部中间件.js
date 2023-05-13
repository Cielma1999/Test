const express = require('express');

const app = express();

//最简单的中间件函数
const mw = function(req,res,next){
    console.log('这是局部中间件');
    next();
}

const mw1 = function(req,res,next){
    console.log('第二个局部中间件');
    next();
}

//局部中间件
app.get('/',mw,(req,res)=>{
    console.log('调用/');
    res.send('Home Page');
    
})

app.get('/user',mw,mw1,(req,res)=>{   //app.get('/user',[mw,mw1],(req,res)=>{   也可以，mw,mw1会依次执行
    console.log('调用/user');
    res.send('User page')
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})