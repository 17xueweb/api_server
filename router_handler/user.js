const db = require('../db/index')

// 导入 bcryptjs 包
const bcrypt = require('bcryptjs')

// 导入 jsonwebtoken 包
const jwt = require('jsonwebtoken')

// 导入 全局配置文件
const config = require('../config')

// 注册新用户处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userInfo = req.body
    // 对表单中的数据进行合法性校验-> 这种if else 来校验写法 效率低下、出错率高、维护性差，推荐使用第三方模块 joi
    // if (!userInfo.username || !userInfo.password) {
    //     return res.cc('用户名或密码不为空！')
    // }

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        // **********注意：先查询后 在查询内部去 调用数据库插入，而不是和db.query并行，并行会导致 一次请求，多次响应**********
        // 利用 bcryptjs 中的 hashSync 对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        // 定义注册用户 sql
        const regUserSql = 'insert into ev_users set ?'
        // 调用 db.query() 执行 sql 语句
        db.query(regUserSql, { username: userInfo.username, password: userInfo.password }, (err, results) => {
            // 判断 sql 语句执行是否成功
            if (err) return res.cc(err)
            // 判断影响行数是否为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册新用户
            res.cc('注册成功！')
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    // 1. 接收表单的数据
    const userInfo = req.body
    // 2. 定义 SQL 语句
    const sqlStr = 'select * from ev_users where username = ?'
    // 3. 执行 SQL 语句，根据用户名查询用户信息
    db.query(sqlStr, userInfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是获取到的条数不等于1
        if (results.length !== 1) return res.cc('登录失败！')

        // TODO: 判断密码是否正确
        const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
        if (!compareResult) return res.cc('登录失败，密码错误！')

        // TODO: 在服务器端生成 token 字符串
        const user = {...results[0], password: '', user_pic: ''}
        // 对用户信息进行加密，生成 token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn})
        // 调用 res.send() 将 token 响应给 客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
    
}