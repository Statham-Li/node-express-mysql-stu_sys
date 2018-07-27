var express = require('express');
var userDao = require('../db/userDao')
var router = express.Router();

/* GET users listing. */
router.get('/login', function (req, res, next) {
  res.render('login')
});
router.post('/login', (req, res, next) => {
  console.log(req.body)
  var user = {
    username: req.body.username,
    password: req.body.password,
    remember: req.body.remember
  }
  userDao.login(user, res);
})

router.get("/register", (req, res, next) => {
  res.render('register', { user: {}, title: "用户注册" })
})
router.post("/register", (req, res, next) => {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  userDao.register(user, res)
})
//GET方式访问update路径时，根据ID将数据库中的数据查出，返回到页面上
router.get("/update", (req, res, next) => {
  // console.log(`req.query=${req.query.id}`)
  userDao.selectUserById(req.query.id, res)
})
//POST方式访问时，代表提交更新后的数据
router.post("/update", (req, res, next) => {
  console.log(req.body)
  var user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password
  }
  userDao.updateUserById(user, res)
})

router.post("/delete", (req, res, next) => {
  console.log(req.body)
  /* var user = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password
  } */
  // userDao.updateUserById(user, res)
  userDao.delete(req.body.id, res)
})

module.exports = router;
