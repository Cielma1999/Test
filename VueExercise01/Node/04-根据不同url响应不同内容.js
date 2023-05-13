const http = require('http');

const server =  http.createServer();

//req包含了与客户端相关的数据和属性
server.on('request',function(req,res){
    const url = req.url;
    let content = '404 Not Found';
    if(url==='/'||'/index.html'){
        content = `<h1>首页</h>`;
    }else if(url ==='/about.html'){
        content = `<h1>关于</h>`;
    }
    res.setHeader('Content-Type','text/html;charset=utf-8');
    const method = req.method;
    const str = `request url is ${url},and request method is ${method}`;
    console.log(str);
    res.end(content);
});

server.listen(80,function(){
    console.log('server running at http://127.0.0.1');
});