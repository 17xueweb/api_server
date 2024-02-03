// 文章的处理函数模块
// 导入数据库操作模块
const db = require('../db/index')
const path = require('path')
// 发布文章的处理函数
exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log('----------')
    // console.log(req.file);
    
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    // TODO: 证明数据都是合法的，可以进行后续逻辑处理
    // 处理文章信息对象
    const articleInfo = {
        // 标题、内容、发布状态、所属分类的id
        ...req.body,
        // 文章封面的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章的发布时间
        pub_date: new Date(),
        // 文章作者的id，因为这是有权限的接口，从token上将用户信息解析出来挂载到req.user上
        author_id: req.user.id
    }
    console.log(articleInfo);
    const sqlStr = 'insert into ev_articles set ?'
    db.query(sqlStr, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        res.cc('发布文章成功！', 0)
    })
}