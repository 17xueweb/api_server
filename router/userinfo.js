const express = require('express')

const router = express.Router()

// 导入用户信息路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户信息的路由
router.post('/userinfo', userinfo_handler.updateUserInfo)

module.exports = router