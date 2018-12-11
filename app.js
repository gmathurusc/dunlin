const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');


app.use(bodyParser.json());

require('./app/routes/authentication')(app);
require('./app/routes/home')(app);

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
app.set('public', path.join(__dirname, 'public'));

//Set Static Path
app.use('/public', express.static(__dirname + '/public'));

port = process.env.PORT || 8888;
app.listen(port, function () {
    console.log("Server serving on " + port+"...");
});
