const express = require('express');
const router = express.Router();
const {models} = require('../db');
const Book = models.Book;
const Author = models.Author;

router.post('/list', async function(req, res) {
  let books = Book.findAll({
    include: [Author]
  }).then(books => {
    res.send({
      success: true,
      data:books
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});

router.get('/list', function(req, res) {
  console.log(req.session.view);
  if (req.session.view) {
    console.log("inc by 1");
    req.session.view = req.session.view + 1;
  }
  else {
    console.log("set to 1");
    req.session.view = 1;
  }
  Book.findAll().then(books => {
    res.render('books', {books: books, view: req.session.view});
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});

router.get('/list/:idBook', function(req, res) {
  let idBook = req.params.idBook;
  Book.findByPk(idBook, {include: [Author]}).then(book => {
    res.render('bookDetails', {book: book});
  }).catch(e => res.send({
    success: false,
    data: e.message
  }));
});

router.post('/new', function(req, res) {
  let book = Book.build(req.body);
  book.save().then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(error => {
    res.send({
      success: false,
      data: e.message
    })
  });
});

router.post('/edit/:idBook', function(req, res) {
  let book = req.body;
  console.log(book);
  let idBook = req.params.idBook;
  Book.findByPk(idBook).then(b => {
    b.title = book.title;
    return b.save();
  }).then(b => {
    res.send({
      success: true,
      data: b
    })
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});

router.get('/delete/:idBook', function(req, res) {
  let idBook = req.params.idBook;
  Book.findByPk(idBook).then(b => {
    return b.destroy();
  }).then(b => {
    res.send({
      success: true,
      data: b
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
module.exports = router;
