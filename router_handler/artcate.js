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

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sqlStr = 'select * from ev_article_cate where name = ? or alias = ?'
    // 执行查重的 SQL 语句
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        // 判断数据的length
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        // length 等于 1 的三种情况，第一种
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
            return res.cc('分类名称与分类别名被占用，请更换后重试！')
        }
        // length 等于 1 的第二种情况
        if (results.length === 1 && results[0].name === req.body.name) {
            return res.cc('分类名称被占用，请更换后重试！')
        }
        if (results.length === 1 && results[0].alias === req.body.alias) {
            return res.cc('分类别名被占用，请更换后重试！')
        }

        // TODO: 分类名称和分类别名都可以用
    })
}