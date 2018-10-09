const express = require('express');
const router = express.Router();
const articles = require('../../module/Articles');
const AuthorInfo = require('../../module/AuthorInfo');

//$route GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get('/test', (req, res) => {
  res.json({
    msg: "server works"
  })
})

router.post('/add', (req, res) => {
  let tag = {}
  switch (req.body.tag) {
    case '小程序':
      tag.title = req.body.tag;
      tag.color = '#87d068';
      break;
    case 'vue':
      tag.title = req.body.tag;
      tag.color = '#6b61f0';
      break;
    case 'react':
      tag.title = req.body.tag;
      tag.color = '#108ee9';
      break;
    case 'node':
      tag.title = req.body.tag;
      tag.color = '#f8a72a';
      break;
    default:
      tag.title = req.body.tag;
      tag.color = '#0f0';
  }
    const newArt = new articles({
      title: req.body.title,
      access: req.body.access,
      tag,
      abstract: req.body.abstract,
      type: req.body.type,
      content: req.body.content,
      nature: req.body.nature
    });
  newArt.save().then(art => {
    articles.count((err, count) => {
    
      AuthorInfo.find({
        _id:"5bb78386250532209f443968"
      }, (err, data) => {
        data[0].ArticleNum = count,
        data[0].lastArticle=art
        data[0].save()
      })
    })
     return res.json(art)
  }
  )
  .catch(err => console.log(err));
})

router.get('/get', (req, res) => {
  let tmp = req.url.split("?")[1];
  let [pageIndex, pageSize] = tmp.split('&');
  pageIndex = pageIndex.split('=')[1]; // 当前页
  pageSize = pageSize.split('=')[1]; // 一页有多少条数据
  let skipnum = (pageIndex - 1) * pageSize;   //跳过数
  articles.find().skip(skipnum).limit(Number(pageSize)).exec((err, data) => {
    res.send({ data: data.reverse()});
  })
});

//search
router.post('/search', (req, res) => {
  const { pageIndex, pageSize, title, type, nature } = req.body;
  let skipnum = (pageIndex - 1) * pageSize;
  let obj = {};
  if (title) {
    obj.title=title
  }
  if (type) {
    obj.type = type
  }
  if (nature) {
    obj.nature = nature
  }
  articles.find(obj).exec((err, data) => {
    let len = data.length;
    // console.log(data[skipnum])
     //let newData = data.slice(skipnum, pageSize);
    // console.log(newData);
    res.send({ len, data });
  });
  // articles.find(obj).skip(skipnum).limit(Number(pageSize)).exec((err, data)=>{
  //   res.send(data.reverse());
  // })
  // let tmp = req.url.split("?")[1];
  // let [pageIndex, pageSize] = tmp.split('&');
  // pageIndex = pageIndex.split('=')[1]; // 当前页
  // pageSize = pageSize.split('=')[1]; // 一页有多少条数据
  // let skipnum = (pageIndex - 1) * pageSize;   //跳过数
  // articles.find().skip(skipnum).limit(Number(pageSize)).exec((err, data) => {
  //   res.send(data.reverse());
  // })
});



router.delete('/delete/:id', (req, res) => {
  articles.deleteOne({
    _id:req.params.id
  }).then(data => {
    articles.count((err, count) => {   
      AuthorInfo.find({
        _id:"5bb78386250532209f443968"
      }, (err, doc) => {
        doc[0].ArticleNum = count,
        doc[0].lastArticle=data
        doc[0].save()
      })
    })
    res.send(data);
  })
});

router.post('/update/:id', (req, res) => { 
  let tag = {}
  switch (req.body.tag) {
    case '小程序':
      tag.title = req.body.tag;
      tag.color = '#87d068';
      break;
    case 'vue':
      tag.title = req.body.tag;
      tag.color = '#6b61f0';
      break;
    case 'react':
      tag.title = req.body.tag;
      tag.color = '#108ee9';
      break;
    case 'node':
      tag.title = req.body.tag;
      tag.color = '#f8a72a';
      break;
    default:
      tag.title = req.body.tag;
      tag.color = '#0f0';
  }
  req.body.tag=tag
  articles.findOneAndUpdate({
    _id: req.params.id
  }, req.body,{new:true}).then(data => {
    res.send(data);
  })
});

router.get('/:id', (req, res) => {
  //console.log(req.params.id)
  let tempAccess = 0;
  articles.findOne({
    _id:req.params.id
  }).then(data => {
    tempAccess = data.access+1
    articles.find({ "_id": req.params.id }, (err, data) => { 
      var temp = data[0];
      temp.access = tempAccess;
      temp.save();
    })
    res.send(data);
    })
   

});

module.exports = router;