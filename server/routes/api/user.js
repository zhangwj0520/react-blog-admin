const express = require('express');
const router = express.Router();
const User = require('../../module/User');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
  res.json({
    msg: "server works"
  })
})

router.post('/register', (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        identity: req.body.identity
    });
    newUser.save().then(data => {
        res.send('注册成功!');
    });
})

router.post('/login', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  //查询数据库
  User.findOne({
      userName
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ err: true,message: "用户不存在!" })
      } else if (password !== user.password) {
        return res.status(404).json({err: true,message: "密码错误!" })
      } else {
        //jwtoken.sign('规则','加密名字','{过期时间}','箭头函数')
        const rule = { id: user, userName: user.userName,identity : user.identity };
        jwt.sign(rule, 'secret', {
          //expiresIn: 3600  token 过期时间
          expiresIn: 3600
        }, (err, token) => {
          if (err) throw err;
          res.json({
            userName: user.userName,
            success: true,
            token: "Bearer " + token,
            identity: user.identity,
            message:"登录成功"
          })
        })
        //res.json({msg:"success"}) 
      }
    })

})
module.exports = router;
