const connect  = require('./connect');

const NyCoord = [-73.9772, 40.7808];
const radianKm = 111.12;

module.exports = async function loadDataCollection(dbName, name, filter){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).find({
        "address.coord.coordinates" :{
            $near : NyCoord, $maxDistance: (filter.km)/radianKm
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
            }}).toArray();
    client.close();
    return response;
}