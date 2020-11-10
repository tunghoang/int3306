const express = require('express');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const app = express();

const {init} = require('./db');

app.use(express.json());

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

init().then(function() {
  app.listen(8000, function() {
    console.log("App started at port 8000");
  });
});
