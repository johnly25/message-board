var express = require('express');
var router = express.Router();
var messageController = require('../controllers/messageController');


/* GET home page. */
router.get('/', messageController.messagesGet);
router.get('/new', messageController.createMessageGet);
router.post('/new', messageController.createMessagePost);

module.exports = router;
