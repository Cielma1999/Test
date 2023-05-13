const express = require('express');

const app = express();


app.get('/',(req,res)=>{
    throw new Error('服务器发生错误！');
    res.send('Home Page');
})
//错误级别中间件
app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send('Error:'+err.message);
    //next();
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})