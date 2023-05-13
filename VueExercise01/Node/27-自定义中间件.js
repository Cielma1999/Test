
const qs =require('querystring');


const bodyParse = (req,res,next)=>{
    let str = '';
    //监听req data事件
    req.on('data',(chunk)=>{
        str+=chunk;
    })
    //监听req end事件
    req.on('end',()=>{
        console.log(str);//此处str是存放的完整请求体数据
        const body = qs.parse(str);
        req.body = body;
        next();
    })

};

module.exports = bodyParse;