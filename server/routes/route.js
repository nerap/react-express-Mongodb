var loadAllData  = require('../mongodb/loadAllData')
var loadDataCuisine  = require('../mongodb/loadDataByCuisine')




async function loadData(req, res, next){
    const response = await loadAllData("json", "totalPerCity");
    res.json(response)
}


async function loadCuisine(req, res, next){
    const response = await loadDataCuisine("json", "totalCuisine", req.body.currentCuisine);
    res.json(response)
}




module.exports =  function (app) {
    app.post('/loadData', loadData);
    app.post('/loadCuisine', loadCuisine);
};
