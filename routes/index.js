var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: "Mini Messageboard", messages: messages });
});

router.get('/new', (req, res, next) =>{
  res.render('form', {});
});

router.post('/new', function (req,res) {
  const data = req.body;
  if (data.msg && data.user) {
    messages.push({text: data.msg, user: data.user, added: new Date()});
  }
  res.redirect('/')

});

module.exports = router;
