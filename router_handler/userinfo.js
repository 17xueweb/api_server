// 导入数据库操作模块
const db = require('../db/index')
// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    // 定义查询用户信息的 SQL 语句
    const sqlStr = 'select username, nickname, email, user_pic from ev_users where id = ?'
    // 调用db.query来执行 SQL 语句
    // 注意：这里user.id 来源于，身份认证成功后，中间件会自动在req上挂载user属性，user属性包含用户信息字段
    db.query(sqlStr, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询的结果可能为空
        if (results.length !== 1) {
            return res.cc('查询用户信息失败！')
        }
        // 用户信息获取成功
        res.send({
            status: 0,
            message: '用户信息获取成功!',
            data: results[0]
        })
    })
}

// 更新用户基本信息处理函数
exports.updateUserInfo = (req, res) => {
    res.send('ok')
}