const express = require('express');
const router = express.Router();

router.post('/list', function(req, res) {
  res.send('List authors');
});

router.post('/new', function(req, res) {
  res.send('Create authors');
});
router.post('/edit', function(req, res) {
  res.send('Edit authors');
});
router.get('/delete', function(req, res) {
  res.send('Delete authors');
});

module.exports = router;
