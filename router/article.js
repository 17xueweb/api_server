// 文章的路由模块
// js文件如果有多个导出，则使用exports  如果只有一个导出则使用module.exports

const express = require('express')

const router = express.Router()

router.post('/add', (req, res) => {
    res.send('ok')
})

module.exports = router