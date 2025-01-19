var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const dotenv = require('dotenv');
dotenv.config()

const port = process.env.PORT



app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

require("./routes/trelloRoutes")(app);



app.listen(port)
console.log('Server running in port: '+ port)

