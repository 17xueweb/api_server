// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义 id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

// 定义头像的验证规则 dataUri() 表示 校验是否是 base64格式
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    // 表示 需要对 body 中的数据进行验证 因为是post请求
    body: {
        username,
        password
    }
}

// 定义更新用户信息的验证规则对象
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email: user_email
  }
}

// 定义更新密码的验证规则对象
/**
 * newPwd: joi.ref('oldPwd') 表示 旧密码 与 新密码 相等
 * newPwd: joi.not(joi.ref('oldPwd')) 表示 旧密码不与 新密码 相等
 * newPwd: joi.not(joi.ref('oldPwd')).concat(password) 表示 新密码不与旧密码相等，同时新密码使用旧密码的验证规则 concat连接
 * 
 */
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

// avatar: avatar 第一个avatar表示前端传来的字段 第二个avatar表示自定义校验
// 验证规则 - 更新头像
exports.update_avatar_schema = {
  body: {
    avatar: avatar
  }
}

/**
 * 为什么导出的时候 需要写上body
 * 因为：post请求，req.body来获取前端传来的参数
 * 
 * const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/)
      .required(),
    repassword: Joi.ref('password')
  },
  // 2.2 校验 req.query 中的数据
  query: {
    name: Joi.string().alphanum().min(3).required(),
    age: Joi.number().integer().min(1).max(100).required()
  },
  // 2.3 校验 req.params 中的数据
  params: {
    id: Joi.number().integer().min(0).required()
  }
}
 */