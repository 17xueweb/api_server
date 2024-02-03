// 文章的处理函数模块

// 发布文章的处理函数
exports.addArticle = (req, res) => {
    console.log(req.body);
    console.log('----------')
    console.log(req.file);
    res.send('ok')
}