const fs = require('fs');
const path = require('path');

const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;


fs.readFile(path.join(__dirname,'index.html'),'utf8',function(err,data){
    if(err){
        return console.log('读取失败'+err.message);
    }
    resolveCSS(data);
});

function resolveCSS(html){
    const r1 = regStyle.exec(html);
    const newCSS = r1[0].replace('<style>','').replace('</style>','');
    fs.writeFile(path.join(__dirname,'/clock/index.css'),newCSS,function(err){
        if(err){
            return console.log('写入CSS成功');
        }
    });
}