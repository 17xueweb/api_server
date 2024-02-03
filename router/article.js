// 文章的路由模块
// js文件如果有多个导出，则使用exports  如果只有一个导出则使用module.exports

const express = require('express')

const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

router.post('/add', article_handler.addArticle)

module.exports = router