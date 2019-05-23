var connect  = require('./connect')

module.exports = async function loadDataCollection(dbName, name, filter){
    const client = await connect();
    console.log(filter);
    const response =  await client.db(dbName).collection(name).find({
        "address.coord.coordinates" :{
            $near : [-73.9772, 40.7808], $maxDistance: (filter.km)/111.12
        },
            cuisine : { $in: filter.cuisine},
            grades: {$elemMatch: {score: { $lt: filter.grade }}}},
        {
            projection :{
                _id : 0,
                name : 1,
                cuisine : 1,
                borough : 1,
                "grades.score" : 1,
                "address.coord.coordinates": 1
            }}).limit(100).toArray();
    client.close();
    return response;
}