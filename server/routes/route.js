var loadAllData  = require('../mongodb/loadAllData')
var loadDataCuisine  = require('../mongodb/loadDataByCuisine')




async function loadData(req, res, next){
    const response = await loadAllData("json", "totalCuisinePerCity");
    res.json(response)
}


async function loadCuisine(req, res, next){
    const response = await loadDataCuisine("json", "totalCityCuisine", req.body.cuisine);

    const result = response.map((data)=> {
        return {
            cuisineType : data._id.cuisine,
            borough : data._id.city,
            totalRestaurantBorough : data.city[0].totalRestaurant,
            percent : Math.round((100 * (data.totalRestaurant/data.city[0].totalRestaurant)) * 1000) / 1000

        }
    });

    res.json(result)
}




module.exports =  function (app) {
    app.post('/loadData', loadData);
    app.post('/loadCuisine', loadCuisine);
};
