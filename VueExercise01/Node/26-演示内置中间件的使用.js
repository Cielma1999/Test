const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/user',(req,res)=>{
    //在服务器用req.body这个属性接受客户端发送过来的请求体数据
    //如果不配置解析中间件，则默认情况下req.body等于undefined
    console.log(req.body);
    res.send('OK');
})
//服务器端可以通过req.body获得json格式和url-encoded格式的数据
app.post('/book',(req,res)=>{
    console.log(req.body);
    //如果不配置解析中间件，则默认情况下req.body等于{}
})

app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})

