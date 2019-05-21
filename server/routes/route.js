var loadAllData  = require('../mongodb/loadAllData')




async function loadData(req, res, next){
    const response = await loadAllData("json", "zip");
    console.log(response);
    res.json(response);
}




module.exports =  function (app) {
    app.post('/loadData', loadData);
};
