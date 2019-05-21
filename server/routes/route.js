

async function loadData(req, res, next){
    res.json({
        id : 1,
        name : "Express work"
    });
}




module.exports =  function (app) {
    app.post('/loadData', loadData);
};
