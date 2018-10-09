
const express = require('express');
const router = express.Router();
const AuthorInfo = require('../../module/AuthorInfo');

//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get('/test', (req, res) => {
  res.json({
    msg: "longin works"
  })
})

router.post('/add', (req, res) => {
    const newUser = new AuthorInfo({
      name: req.body.name,
      access: req.body.access,
      tag: req.body.tag,
      present: req.body.present,
      ArticleNum: req.body.ArticleNum,
      lastArticle: req.body.lastArticle,
    });
    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
})

router.get('/get', (req, res) => {
    AuthorInfo.find(null,(err, data) => { 
      var temp = data[0];
      let acc = temp.totalAccess + 1;
      temp.totalAccess =acc;
      temp.save();
    }).then(info => {
        if (!info) {
          return res.status(404).json('没有任何数据')
      }
        res.json(info[0]);
    
      })
      .catch(err => res.status(404).json(err));
});

module.exports = router;