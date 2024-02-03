// 文章的处理函数模块

// 发布文章的处理函数
exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log('----------')
    // console.log(req.file);
    
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

    // TODO: 证明数据都是合法的，可以进行后续逻辑处理
    res.send('ok')
}