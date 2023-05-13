const express = require('express');
//创建路由对象
const router = express.Router();
//导入用户路由处理函数对应的模块
const userinfo_handler =require('../router_handler/userinfo');

const expressJoi =require('@escook/express-joi');
const {update_userinfo_schema ,update_password_schema,update_avatar_schema} = require('../schema/user');


router.get('/userinfo',userinfo_handler.getUserInfo);

router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo);

router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword);

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)


module.exports = router;