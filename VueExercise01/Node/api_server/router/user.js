const express = require('express');
//创建路由对象
const router = express.Router();
//导入用户路由处理函数对应的模块
const user_handler =require('../router_handler/user');

const expressJoi =require('@escook/express-joi');
const {reg_login_schema} = require('../schema/user');
//注册
router.post('/register',expressJoi(reg_login_schema),user_handler.register);
//登录
router.post('/login',expressJoi(reg_login_schema),user_handler.login);
//导出
module.exports = router;