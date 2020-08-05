var express = require('express');

var router = express.Router();

var user = require("../middlewares/user");

var chat= require('../controllers/chat')
/* GET users listing. */
router.get('/:id',user, chat.getCaht);

module.exports = router;
