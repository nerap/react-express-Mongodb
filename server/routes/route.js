var loadAllData  = require('../mongodb/loadAllData')
var loadLogin  = require('../mongodb/loginLogin')
var loadDataCuisine  = require('../mongodb/loadDataByCuisine')
var insertDataFilter  = require('../mongodb/insertDataFilter')
var loadUserResearch  = require('../mongodb/loadUserResearch')
var groupResearch  = require('../mongodb/groupResearch')




async function loadData(req, res, next){
    const response = await loadAllData("json", "restaurants", req.body.filter);
    res.json(response)
}


async function loadCuisine(req, res, next){
    const response = await loadDataCuisine("json", "totalCuisine", req.body.currentCuisine);
    res.json(response)
}

async function logged(req, res, next){
    if (!(req.session.logged)){
        res.json({
            logged : false
        });
    } else {
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
                    req.session._id = response[0]._id;

                    console.log(response[0]._id);
                    res.json ({_id : response[0]._id});
                } else {
                    res.send('Bad Username or Password')
            }
        }
};

async function filterHandler(req, res){
    const filter = {
        id : req.session._id,
        cuisine : req.body.filter.cuisine,
        grade : req.body.filter.grade,
        km : req.body.filter.km
    };

    console.log(filter);

    await insertDataFilter('user', 'research', filter);
    res.send("Data insert Successfully");
}

async function loadUserResearchHandler(req, res){
    const response = await loadUserResearch('user', 'research', req.session._id);
    res.json(response);
}

async function getAnalyzedData(req, res){
    const response = await groupResearch('user', 'research');
    res.json(response);
}



module.exports =  function (app) {
    app.post('/loadData', loadData);
    app.post('/loadCuisine', loadCuisine);
    app.post('/logged', logged);
    app.post('/login', loginHandler);
    app.post('/insertFilter', filterHandler);
    app.post('/loadUserResearch', loadUserResearchHandler);
    app.post('/getResearch', getAnalyzedData);
};
