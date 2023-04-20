const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');

const sequelize = require('./src/models/index');
const config = require('./src/config/server');
const authConfig = require('./src/config/auth');
const routes = require('./src/routes/index');

const app = express();
const port = config.port;


// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views', 'pages'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "flixtor-session",
      secret: "COOKIE_SECRET",
      httpOnly: true
    })
  );
  
// static file 
app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));

// router
routes(app);


// 
app.get('/', function(req, res){
    res.send("Hello World");
})

app.listen(port, function(error){
    if (error) {
        console.log("Something went wrong");
    }
    console.log("server is running port:  " + port);
})


// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });


