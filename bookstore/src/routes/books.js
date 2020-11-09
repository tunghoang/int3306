const express = require('express');
const router = express.Router();
const {models} = require('../db');
const Book = models.Book;

router.post('/list', async function(req, res) {
  let books = await Book.findAll();
  console.log(books);
  res.send(books);
});

router.post('/new', function(req, res) {
  res.send('Create books');
});

router.post('/edit', function(req, res) {
  res.send('Edit books');
});

router.get('/delete', function(req, res) {
  res.send('Delete books');
});
module.exports = router;
