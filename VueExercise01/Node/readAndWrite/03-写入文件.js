//导入fs模块来操作文件
const fs = require('fs');

//调用writeFile()方法读取文件
//  参数1  文件路径
//  参数2  写入的内容
//  参数3  回调函数
fs.writeFile('./test.txt','abc',function(err){
    //如果写入成功，err为null否则是一个错误对象
    console.log(err);
    
    
});