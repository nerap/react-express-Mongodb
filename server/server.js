const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
var path = require('path');
const route = require('./routes/route');
const app = express();
const port = process.env.PORT || 5000;



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname + '/../build')));

app.get('*', function (request, res) {
    res.sendFile(path.resolve('/Users/Raphael/WebstormProjects/react-express-Mongodb/build/index.html'));

});


/*app.use(function (req, res, next){
    console.log(req.session);
    if (!(req.session.logged)){
        console.log("hi");
        res.status(401);
    }
    else {
        next();
    }
});*/

route(app);

app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});