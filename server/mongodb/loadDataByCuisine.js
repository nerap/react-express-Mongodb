var connect  = require('./connect')

module.exports = async function loadDataCuisine(dbName, name, cuisine){
    const client = await connect();
    return await client.db(dbName).collection(name).find({ "_id.cuisine" : cuisine }).limit(100).toArray();
}