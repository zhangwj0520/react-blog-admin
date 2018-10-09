const express = require('express');
const router = express.Router();
const Say = require('../../module/Say');
const AuthorInfo = require('../../module/AuthorInfo');
const passport = require('passport');

router.get('/test', (req, res) => {
  res.json({
    msg: "server works"
  })
})

router.post('/add', (req, res) => {
  console.log(req.body)
  const nowSay=req.body.say
    const newSay = new Say({
      say: nowSay,
    });
  newSay.save().then(say => {
    Say.count((err, count) => {
      AuthorInfo.find({
        id:1
      }, (err, data) => {
        data[0].sayNumber = count,
        data[0].lastSay=say
        data[0].save()
      })
    })
    return res.json(say)
  }).catch(err => console.log(err));
 
})

router.get('/get', (req, res) => {
  //console.log(req.url); // url=/get?pageIndex=1&pageSize=10
  let tmp = req.url.split("?")[1];
  let [pageIndex, pageSize] = tmp.split('&');
  pageIndex = pageIndex.split('=')[1]; // 当前页
  pageSize = pageSize.split('=')[1]; // 一页有多少条数据
  let skipnum = (pageIndex - 1) * pageSize;   //跳过数
  Say.find().skip(skipnum).limit(Number(pageSize)).exec((err, data) => {
    res.send(data);
  })
});



router.delete('/delete/:id', passport.authenticate('jwt', {
  session: false
}),(req, res) => {
  Say.deleteOne({
    _id:req.params.id
  }).then(data => {
    Say.count((err, count) => {
      AuthorInfo.find({
        _id:"5bb78386250532209f443968"
      }, (err, doc) => {
        doc[0].sayNumber = count,
        doc[0].lastSay=data
        doc[0].save()
      })
    })
    res.send(data);
  })
});

module.exports = router;