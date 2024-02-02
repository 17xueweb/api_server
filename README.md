## 1. 初始化

### 1.1 创建项目

1. 下载 express

2. 新建 app.js 在文件中编写服务器代码

### 1.2 配置 cors 跨域

### 1.3 配置 解析表单数据的中间件 

### 1.4 新建路由 和 路由处理函数文件夹

### 1.5 创建用户路由文件，并且编写用户路由代码导出，挂载到app.js

### 1.6 抽离 路由模块处理函数

## 2. 登录注册

### 2.1 新建 ev_users 用户表
1. 表字段包括：
        - id int(整数类型) 主键(PK)/不为空(NN)/唯一性(UQ)/自增(AI) 
        - username varchar(255)字符串 不为空/唯一性
        - password varchar(255) 不为空
        - nickname varchar(255) 
        - email varchar(255)
        - user_pic text(存储可长可短的字符串，没有最大上限)

### 2.2 下载mysql 并 创建数据库连接对象

### 2.3 注册

#### 2.3.1 校验表单数据是否合法

#### 2.3.2 校验用户名是否被占用

#### 2.3.3 利用 bcryptjs 对密码进行加密

#### 2.3.4 注册新用户（sql插入数据）

### 2.4 优化 res.send() 重复代码
1. 编写中间件
2. 将中间件函数 挂载到 res 上，后面所有路由可以从 res 获取到

### 2.5 表单数据验证方式修改

### 2.6 登录

#### 2.6.1 校验登录数据是否合法（和注册公用同一个校验规则 schema/user.js）

#### 2.6.2 根据前端传来的用户名 查询数据库中是否存在该用户

#### 2.6.3 判断用户输入的密码是否正确（bcrypt.compareSync(用户输入密码,数据库密码))

#### 2.6.4 生成 jwt token字符串
1. 利用 es6 对象解构 剔除 密码和图片
2. 导入 jsonwebtoken 包
3. 根目录新建一个 config.js 文件 用做全局配置文件，配置token 生成的秘钥和token过期时间
4. 利用 jwt.sign() 生成 token 字符串

#### 2.6.5 配置解析 token 的中间件
1. 导入 express-jwt 包
2. 在 app.js 路由之前 配置 解析 token 的中间件
3. app.js 错误级别的中间件中 增加解析失败错误提示

## 3. 个人中心

### 3.1 获取用户的基本信息

#### 3.1.1 初始化路由模块

#### 3.1.2 初始化路由处理函数模块

#### 3.1.3 获取用户基本信息（其中req.user 是因为身份认证成功后，express-jwt中间件往 req挂载固定属性 user）
1. 注意：id是从token解析中取出

### 3.2 更新用户的基本信息

#### 3.2.1 定义路由和路由处理函数

#### 3.2.2 验证更新用户信息表单数据


### 3.3 重置密码

#### 3.3.1 定义密码重置路由和路由处理函数

#### 3.3.2 定义密码重置的验证函数中间件并使用

#### 3.3.3 实现密码重置功能
1. 根据 id 查询用户是否存在
2. 判断用户的旧密码(明文) 与 数据库存的密码(密文)是否一致
3. 将新密码到数据库中，更新之前利用bcrypt.hashSync对新密码进行加密

### 3.4 更新用户头像

#### 3.4.1 定义路由和处理函数

#### 3.4.2 校验客户端提交的 avatar 字段格式，其中 joi.string().dataUri表示校验 base64格式

#### 3.4.3 将更新后的头像存入数据库

## 4. 文章分类管理
### 4.1 新建 ev_article_cate 表 （文章分类表）
1. 表字段包括：
        - id int(整数类型) 主键(PK)/不为空(NN)/唯一性(UQ)/自增(AI) 
        - 分类名称 name varchar(255)  不为空/唯一性
        - 分类别名 alias  varchar(255) 不为空
        - 数据是否标记删除 is_delete TINYINT(1)  布尔值  不为空 default为1    0 - 没有被删除， 1 - 被删除

### 4.2 获取文章分类列表

#### 4.2.1 初始化文章分类路由模块

#### 4.2.2 初始化路由处理函数模块
