var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PruduceRoute = require('./Route');
app.use('/Users', PruduceRoute);
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    next(new Error("Please Add URL : /Users"));
})

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

var server = app.listen(8082, function () {
    console.log("Example app listening at http://localhost:8082")
})