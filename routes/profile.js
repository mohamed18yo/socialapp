var express = require("express");
var router = express.Router();
var user = require("../middlewares/user");
var profile= require('../controllers/profile');

router.get('/', user ,profile.getProfile);

router.get('/:id', user ,profile.getProfile);

module.exports = router;