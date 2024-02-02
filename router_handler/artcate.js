// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 这是获取文章分类列表的处理函数
exports.getArtCates = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const sqlStr = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    // 调用 db.query() 执行 SQL 语句
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results
        })
    })
}