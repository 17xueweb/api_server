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
    // 定义待执行的 SQL 语句
    const sqlStr = 'update ev_users set ? where id = ?'
    // 调用 db.query() 执行 SQL 语句并传递参数
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc("更新用户的基本信息失败！")
        // 成功
        res.cc('更新用户信息成功', 0)
    })
}

// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    // 根据 id 查询用户是否存在
    const sqlStr = 'select * from ev_users where id = ?'
    // 身份认证成功后，express-jwt中间件会往 req 上挂载一个 user属性 属性值为用户信息
    db.query(sqlStr, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 判断结果是否存在
        if (results.length !== 1) return res.cc('用户不存在！')
        res.cc('ok')

        // TODO: 判断用户输入的旧密码是否正确
    })
}