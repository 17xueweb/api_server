const express = require('express')

const router = express.Router()

const user_handle = require('../router_handler/user')

// 1. 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户 
/**
 * expressJoi 中间件，校验字段
 * 注册的路由，先经过中间的 中间件，通过了就流转到 后面的路由处理函数中。
 *                             失败了，抛出了错误，错误需要再定义一个全局的 错误级别中间件
 */
router.post('/reguser', expressJoi(reg_login_schema), user_handle.regUser)
// 登录
router.post('/login', expressJoi(reg_login_schema), user_handle.login)

module.exports = router