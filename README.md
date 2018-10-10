# react + antd 个人博客后台管理
## 演示地址
 [后台管理](http://www.zhangweijie.com.cn/admin)

## 说明
通过react框架,实现的个人博客全栈系统,本博客是一个react全栈系统的后端管理部分,主要功能包括添加,编辑博客文章及说说心情,,并区分登录用户,只有管理员可以添加、编辑和删除. 并对文章和说说和访问量做出相应的统计.可以方便的查看到当前最新的文章和说说等功能.




## 技术要点
1. ui使用antd构建页面
2. 前端框架基于react,使用create-react-app搭建脚手架
3. 路由使用react-router-dom
4. 使用react-redux实现组件之间的数据的传递
5. 使用redux-saga和fetch实现异步事件的请求
6. 使用mongodb实现数据的存储
7. 博客编辑使用braft-editor
8. 首页数字动画显示使用react-countup
9. 首页两个图标使用的是bizcharts 

## 服务器端
1. 使用node、express框架
2. body-parser对post请求的请求体进行解析
3. jsonwebtoken、passport实现token生成，及认证功能



