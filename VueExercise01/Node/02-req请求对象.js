const http = require('http');

const server =  http.createServer();

//req包含了与客户端相关的数据和属性
server.on('request',function(req,res){
    const url = req.url;
    const method = req.method;
    const str = `request url is ${url},and request method is ${method}`;
    console.log(str);
    res.end(str);
});

server.listen(80,function(){
    console.log('server running at http://127.0.0.1');
});