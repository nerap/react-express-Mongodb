var connect  = require('./connect')

module.exports = async function loadDataCuisine(dbName, name, currentCuisine){
    const client = await connect();
    const regex = "^" + currentCuisine;
    const response =  await client.db(dbName).collection(name).find({_id : {$regex: regex, $options:"i"}}, {projection : {_id: 1}}).limit(100).toArray();
    client.close();
    return response;
}