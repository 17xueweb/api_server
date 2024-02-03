// 文章的路由模块
// js文件如果有多个导出，则使用exports  如果只有一个导出则使用module.exports

const express = require('express')

const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handler/article')

// 导入 multer 和 path
const multer = require('multer')
const path = require('path')

// 创建 multer 实例
const uploads = multer({ dest: path.join(__dirname, '../uploads')})

router.post('/add', uploads.single('cover_img'), article_handler.addArticle)

module.exports = router