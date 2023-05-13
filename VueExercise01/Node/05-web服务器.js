const fs = require('fs');
const http = require('http');
const path = require('path');
const server =  http.createServer();

//req包含了与客户端相关的数据和属性
server.on('request',function(req,res){
    const url = req.url;
   
    res.setHeader('Content-Type','text/html;charset=utf-8');
    const fpath = path.join(__dirname,url)
 
    fs.readFile(fpath,'utf-8',(err,data)=>{
        if(err){
            return res.end('404 Not Found');
        }else{
            return res.end(data);
        }
    })
    
});

server.listen(80,function(){
    console.log('server running at http://127.0.0.1');
});