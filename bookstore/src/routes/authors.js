const express = require('express');
const router = express.Router();
const {models} = require('../db');
const Author = models.Author;
const Book = models.Book;

router.post('/list', function(req, res) {
  Author.findAll({
    include: [Book]
  }).then(authors => {
    res.send({
      success: true,
      data: authors
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  })
});

router.post('/new', function(req, res) {
  let author = req.body;
  Author.create(author).then(a => {
    res.send({
      success: true,
      data: a
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
});
router.post('/edit/:idAuthor', function(req, res) {
  let idAuthor = req.params.idAuthor;
  let author = req.body;
  Author.findByPk(idAuthor).then(a => {
    Object.assign(a, author);
    return a.save();
  }).then(a => {
    res.send({
      success: true,
      data: a
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    })
  });
  res.send('Edit authors');
});
router.get('/delete/:idAuthor', function(req, res) {
  let idAuthor = req.params.idAuthor;
  Author.findByPk(idAuthor).then(a => a.destroy()).then(a => {
    res.send({
      success: true,
      data: a
    });
  }).catch(e => {
    res.send({
      success: false,
      data: e.message
    });
  });
  res.send('Delete authors');
});

module.exports = router;
