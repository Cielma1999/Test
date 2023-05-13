const express = require('express');
const bodyParse =require('./27-自定义中间件');
const app = express();

app.use(bodyParse);
app.post('/user',(req,res)=>{
    res.send(req.body);
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})