const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const authorInfo = require('./routes/api/authorInfo')
const articles = require('./routes/api/articles')
const say = require('./routes/api/say')
const user = require('./routes/api/user')

//passport初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//DB config
const db = require('./config/database').mongoURL;

//Connct to mongodb
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected 数据库连接成功"))
    .catch(err => console.log(err))

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");//来源的域名和端口号
    res.header('Access-Control-Allow-Headers',"Content-Type,Accept,Authorization");//允许的跨域头
    res.header('Access-Control-Allow-Methods',"GET,POST,PUT,OPTIONS,DELETE");//允许的方法
    //如果请求的方法名是OPTIONS的话，则直接结束 请求
    //options探测请求 当客户端发送post请求之后行发送一个options请求，看看服务器支持不支持post请求
    if(req.method == 'OPTIONS'){
        return res.sendStatus(200);
    }else{
        next();
    }
});
      
//使用body-parser中间件
app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send('hello world')
// })

//使用routes
app.use('/api/authorinfo', authorInfo);
app.use('/api/articles', articles);
app.use('/api/say', say);
app.use('/api', user);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port `+port)
})