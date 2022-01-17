const express = require('express');
const { engine } = require ('express-handlebars');
const path = require ('path');
const session = require('express-session')
const morgan = require ('morgan')
const flash = require ('connect-flash')
const MySQLStore = require ('express-mysql-session');
const passport = require('passport');

const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD ,
    database : process.env.DB_DATABASE
}

// Initializations
const app = express();
require('dotenv').config()
require('./lib/passport')

// Settings
app.set('port', process.env.PORT || 4000 );
app.set('views', path.join(__dirname , 'views'));
app.engine('hbs', engine({ 
    defaultLayout: 'layout',
    layoutsDir: path.join(app.get ("views"), "layouts"),
    
    // partialsDir: path.join(app.get ("views"), "partials"),  --> Por default se toma esta ruta views/partials (solo se configura si se cambia esta ruta)
    extname : '.hbs'
}));
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Static files

app.use(express.static(path.join(__dirname , 'public')));

// Middlewares
app.use(session({
    secret: 'askldj1234jakldsj12',
    resave: false,
    saveUninitialized: false
   
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Global Variables

app.use((req,res, next) =>{

    app.locals.success = req.flash('success')
    next();

});

// Routes

app.use(require('./routes/index.routes'))
app.use(require('./routes/sendMail.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/ejercicios.routes'));




module.exports = app;