const express = require('express');

const app = express();
//导入路由
const router = require('./20-router');

//
app.use(router);
app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1');
})