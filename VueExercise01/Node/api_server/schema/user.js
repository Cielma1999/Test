const joi =require('joi');
//用户名验证
const username = joi.string().alphanum().min(8).max(14).required();
//密码验证  \S 表示非空字符
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
//定义id,nickname,email的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const useremail = joi.string().email().required();
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required();


exports.reg_login_schema = {
    //表示对req.body中的数据进行验证
    body:{
        username,
        password,
    },
}

exports.update_userinfo_schema = {
    body:{
        id:id,
        nickname:nickname,
        email:useremail //   接收的变量名:验证规则
    }
}

// 验证规则对象 - 重置密码
exports.update_password_schema = {
    body: {
      // 使用 password 这个规则，验证 req.body.oldPwd 的值
      oldPwd: password,
      // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
      // 解读：
      // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
      // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
      // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
      newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
      avatar,
    },
}
  