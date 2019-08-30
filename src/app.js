const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//connect database
mongoose.connect('mongodb://localhost/ejemplo')
    .then(db => console.log("Database connected"))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000); //tomara un puerto del sistema o si no por defecto el 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //preprar el motor de plantilla

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //convertir los datos el formulario en json
app.use(express.static(path.join(__dirname, 'public')));

//routes
const indexRoutes = require('./routes/index');//extraemos las rutas en el la carpeta routes
app.use('/', indexRoutes); //y usamos la rutas aca

//Server listening
app.listen(app.get('port'), () => {
    console.log(`Server trabajando en el puerto ${app.get('port')}`);
});