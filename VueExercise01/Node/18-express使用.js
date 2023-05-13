const express = require('express');

const app = express();

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})
app.get('/user',(req,res)=>{
    res.send({name:'sz',age:30});
})

app.get('/',(req,res)=>{
    console.log(req.query);
    res.send(req.query);
})
app.get('/user/:id/:name',(req,res)=>{
    console.log(req.params);
    res.send(req.params);
})

app.post('/user',(req,res)=>{
    res.send('请求成功');
})