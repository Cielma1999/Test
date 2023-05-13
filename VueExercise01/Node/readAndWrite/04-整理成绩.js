//导入fs模块来操作文件
const fs = require('fs');

fs.readFile('./grade.txt','utf8',function(err,data){
    if(err){
        return console.log('读取文件失败'+ err.message);
    }else{
        console.log(data);
    }
    const arrOld = data.split(' ');
    console.log(arrOld);
    const arrNew = [];
    arrOld.forEach(item=>{
        arrNew.push(item.replace('=',':'));
    });
    console.log(arrNew);
    const newStr = arrNew.join('\n');
    console.log(newStr);
    fs.writeFile('./grade.txt',newStr,function(err){
        if(err){
            console.log('读取文件失败'+ err.message);
        }else{
            console.log('写入成功');
        }
    });

});

