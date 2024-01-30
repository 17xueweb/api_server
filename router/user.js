const express = require('express')

const router = express.Router()

const user_handle = require('../router_handler/user')

// 注册新用户
router.post('/reguser', user_handle.regUser)
// 登录
router.post('/login', user_handle.login)

module.exports = router