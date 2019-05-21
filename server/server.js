const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieParser());

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        id : 1,
        name : "Express work"
    });
});

app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});