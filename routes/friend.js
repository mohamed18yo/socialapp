var express = require('express');
var router = express.Router();
var friend = require('../controllers/friend')

// router.post('/', (req, res)=>{
//     res.send('hello are you okay')
// })
router.post('/add', friend.add)
router.post('/cancel', friend.cancel)
router.post('/accept', friend.accept)
router.post('/reject' , friend.reject)
router.post('/delete' , friend.delete)
  
module.exports = router;
