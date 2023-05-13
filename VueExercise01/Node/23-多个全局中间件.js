const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('第一个');
    next();
});

app.use((req,res,next)=>{
    console.log('第二个');
    next();
});


app.get('/',(req,res)=>{
    console.log('调用/');
    res.send('Home Page');
    
})

app.get('/user',(req,res)=>{
    console.log('调用/user');
    res.send('User page')
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})