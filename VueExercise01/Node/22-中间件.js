const express = require('express');

const app = express();

//最简单的中间件函数
const mw = function(req,res,next){
    console.log('这是最简单的中间件函数');
    next()
}

app.use((req,res,next)=>{
    const time = Date.now();
    req.startTime = time;
    next();
});

app.get('/',(req,res)=>{
    console.log('调用/'+req.startTime);
    res.send('Home Page');
    
})

app.get('/user',(req,res)=>{
    console.log('调用/user'+req.startTime);
    res.send('User page')
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})