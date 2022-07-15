
var createError = require('http-errors');
var express = require('express');
const dirTree = require('directory-tree');
const path = require('path');
const dirname = path.resolve(__dirname);
const filteredTree = dirTree(dirname, { attributes: ["size", "type", "extension", "birthtimeMs", "mode"] });
var { buildSchema } = require('graphql');
const cors = require("cors");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var directories = [filteredTree];


// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query { 
    getFolderDetails(name: String): [File],
  },

  type File {
    extension: String
    birthtimeMs: Float
    mode:Int
    name: String
    size: Int
    type:String
    path:String
    children: [File]
  }
`);


// Return a list of directories 
var getFolderDetails = function (args) {
  if (args.name) {
    var name = args.name;
    return directories.filter(f => f.name === name);
  }else{
    return directories;
  }
}

// Root resolver
var root = {
  getFolderDetails: getFolderDetails
};

var app = express();

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


const port = process.env.PORT || 5000;

/* app.listen(port, function () {
  console.log(`Running a GraphQL API server on port http://localhost:${port}/graphql`);
}); */
app.listen(port)
console.log(`Running a GraphQL API server on port http://localhost:${port}/graphql`);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
