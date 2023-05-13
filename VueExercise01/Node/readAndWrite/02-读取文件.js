//导入fs模块来操作文件
const fs = require('fs');

//调用readFile()方法读取文件
//  参数1  读取文件路径
//  参数2  读取文件时采用的编码格式
//  参数3  回调函数，读取成功或失败的结果
fs.readFile(__dirname+'/test.txt','utf8',function(err,data){
    if(err){
        return console.log('读取文件失败'+ err.message);
    }else{
        console.log(data);
    }
    
    
});