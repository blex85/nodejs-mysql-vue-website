﻿# 前言
	主要是为了记录学习与生活的美好
----------
## 所使用的技术栈
	Node.js + Express + MySQL + Vue.js 开发一套完整的个人网站项目
---------------------------
### 项目包含的功能
#### 服务端
* 管理员与验证接口
* 文章管理接口
* 留言与一级回复接口
* 图片接口

#### 前端
* 使用vue-cli 3.x 模板搭建
* 使用element-ui搭建后台管理界面系统
* 使用 axios 来发送http请求
### 项目特点
* 前后端分离，二者不相交，开发流程清晰，使用express快速搭建服务端的API接口，使用vuejs框架搭建博客前端展示网站与后台管理系统
* 利用了sequelize框架来操作MySQL，使用成本低，操作简便，扩展性好
* 采用jwt对登录用户的验证机制
* 前端网站采用vue-cli3搭建，编写可重复使用的组件，简单且易于维护
* 后台管理系统使用 element-ui组件库，快速、简单、清晰的管理与构建
* 图片上传前利用canvas进行压缩，减少图片体积

## 如何使用呢？
### 首先是数据库的创建
在跑起项目之前一定要创建好my_website数据库，不然会出现一推报错信息，页面上空空如也
	
	# 登录数据库
	$ mysql -u root -p 密码
### 根据自己的偏好修改express项目下的数据库配置
请在[app/core/dbConfig.js](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/app/core/dbConfig.js)修改

	# 克隆项目代码
	$ git clone https://github.com/pumpkinduan/nodejs-mysql-vue-website.git

	# 进入项目根目录
	$ cd nodejs-mysql-vue-website

	# 安装依赖包
	$ npm install

	# 启动 Node.js + Express 项目
	$ nodemon index

	# 启动前端项目
	1. 在根目录下进入frontEnd项目：cd frontEnd，
	2. 安装包，执行: npm install 命令，
	3. 启动服务: npm run server, 浏览器会自动开启页面

	# 启动后台管理系统
	1. 在根目录下进入admin项目：cd admin，
	2. 安装包，执行: npm install 命令，
	3. 启动服务: npm run server;  浏览器会自动开启页面

## 接口文档说明
* [管理员与验证接口](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/documents/admin.md)
* [文章管理接口](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/documents/article.md)
* [留言接口](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/documents/comment.md)
* [回复接口](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/documents/reply.md)
* [图片接口](https://github.com/pumpkinduan/nodejs-mysql-vue-website/blob/master/documents/img.md)
## 后端代码 文件夹结构
###  backEnd目录下的
    *  index.js
        -  主程序，程序的入口，通过它来加载并调动其他模块
    *  server.conf
        -  配置后台全局信息
    *  config.js
        -  读取server.conf，并将其以k-v形式导入到一个通用对象
    *  loader.js
        -  加载api文件夹下的.js，并以map数据结构存储
------------------------------------------------------------
### app 文件夹下的
 *  api文件夹
    -  用来处理动态数据（例如用户点击登录按钮，则由user.js来处理）

    -  约定：将url的path名与接口名分别作为map的k和v,并导出map

* router文件夹: 
    -  匹配api路径接口,将其从主程序文件中分离出来，避免主程序代码繁多

*  dao文件夹: 
    - 查询数据库的接口

*  util文件夹: 
    -  通用工具api

*  model文件夹
    -  数据库的表模型，如 user.js 是用户信息表

*  core文件夹
    -  一些核心文件，例如: db.js连接数据库并建立通用模型数据表

