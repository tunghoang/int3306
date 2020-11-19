const express = require('express');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const app = express();
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const cors = require('cors');

const {init} = require('./db');

console.log(__dirname);

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(express.json());

app.use(session({
  secret: "bi mat",
  store: new FileStore({}),
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, 'views');
console.log(viewPath);
app.set('views', viewPath);
console.log('set views already', viewPath);
init().then(function() {
  app.listen(8000, function() {
    console.log("App started at port 8000");
  });
});
