const express = require('express')

const router = express.Router()

// 获取用户基本信息的路由
router.get('/userinfo', (req, res) => {
    res.send('ok')
})

module.exports = router