var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter  = 0;

app.get('/counter', function(req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var todo = [];
app.get('/getDetails/:text', function(req, res) {
  var name = req.params.text;
  todo.push(name);
  res.send(JSON.stringify(todo));
});  

var articles =  {
  'article-one' :{
    title : 'Article One | Shriram',
    heading : 'Article One',
    date : 'Feb 13 2018',
    content : `
      <p>This is article one.This is my first article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article one.This is my first article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article one.This is my first article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>`
  },
  
  'article-two' :{
    title : 'Article Two | Shriram',
    heading : 'Article Two',
    date : 'Feb 14 2018',
    content : `
      <p>This is article two.This is my Second article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article two.This is my Second article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article two.This is my Second article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>`
  },
  
  'article-three' :{
    title : 'Article Three | Shriram',
    heading : 'Article Three',
    date : 'Feb 13 2018',
    content : `
      <p>This is article thee.This is my third article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article three.This is my third article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>

      <p>This is article three.This is my third article.This is article one.This is my first article.
        This is article one.This is my first article
      </p>`
  }

};

function createTemplate(data) {
  var title = data.title;
  var date = data.date;
  var heading = data.heading;
  var content = data.content;

  var htmlTemplate = `
    <html>
    <head>
      <title>${title}</title>
      <meta name="viewport" content="width = device-width, initial-scale = 1" /> 
      <link href="/ui/style.css" rel="stylesheet">
    </head>
    <body>
      <div class="container">
        <div>
          <a href="/">Home</a>
        </div>
        <hr />
        <h1>
          ${heading}
        </h1>
        <div>
          ${date}
        </div>
        <div>
          ${content}
        </div>
     </div>
   </body>
   </html>`;

  return htmlTemplate;
}

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
