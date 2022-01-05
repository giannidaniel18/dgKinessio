const express = require('express');
const { engine } = require ('express-handlebars');
const path = require ('path');
const session = require('express-session')
const morgan = require ('morgan')

// Initializations
const app = express();
require('dotenv').config()






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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'askldj1234jakldsj12',
    resave: false,
    saveUninitialized: true
}));


// Global Variables

// Routes

app.use(require('./routes/index.routes'))
app.use(require('./routes/sendMail.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/ejercicios.routes'));




module.exports = app;