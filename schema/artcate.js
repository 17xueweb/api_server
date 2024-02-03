// 导入定义验证规则的模块
const joi = require('joi')

// 定义 name 和 alias 的验证规则
const name = joi.string().required()
// alphanum 只能包含字母和数字
const alias = joi.string().alphanum().required()
// 定义删除文章分类id的验证规则
const id = joi.number().integer().min(1).required()

// 导出共享验证规则对象
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}
/**
 * query: get 请求 通过url传递参数
 * params: get请求 动态参数获取 /:id 通过url传递参数
 * body: post请求 通过body传递参数
 */
// 导出删除文章分类的验证规则对象
exports.delete_cate_schema = {
    params: {
        id
    }
}

// 根据 id 获取文章分类规则对象
exports.get_cate_schema = {
    params: {
        id
    }
}

// 根据 id 更新文章分类规则对象
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}