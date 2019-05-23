

var loadAllData  = require('../mongodb/loadAllData')
var loadLogin  = require('../mongodb/loginLogin')

var loadDataCuisine  = require('../mongodb/loadDataByCuisine')




async function loadData(req, res, next){
    const response = await loadAllData("json", "restaurants", req.body.filter);
    res.json(response)
}


async function loadCuisine(req, res, next){
    const response = await loadDataCuisine("json", "totalCuisine", req.body.currentCuisine);
    res.json(response)
}

async function logged(req, res, next){
    console.log(req.session);
    if (!(req.session.logged)){
        console.log("hi");
        res.json({
            logged : false
        });
    }
    else {
        res.json({
            logged : true
        });
    }
}

async function loginHandler(req, res) {
        if (req.body.username && req.body.password) {
            const response = await loadLogin('user', "emailPassword", req.body);

            if(response.length > 0){
                   // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                    req.session.logged = true;

                    res.json ({
                        _id : response[0]._id
                    });

                } else {
                    res.send('Bad Username or Password')
            }
        }

};


module.exports =  function (app) {
    app.post('/loadData', loadData);
    app.post('/loadCuisine', loadCuisine);
    app.post('/logged', logged);
    app.post('/login', loginHandler)
};
