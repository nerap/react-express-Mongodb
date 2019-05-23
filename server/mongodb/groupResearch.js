const connect  = require('./connect')

module.exports = async function loadDataCuisine(dbName, name){
    const client = await connect();
    const response = await client.db(dbName).collection(name).aggregate([
        { $group : {
                _id: { id: "$id", cuisine : "$cuisine"}, grades: { $avg: "$grade"}, distance: { $avg: "$km"}
            }} ]).toArray();
    client.close();
    return response;
}