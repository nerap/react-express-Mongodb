var connect  = require('./connect')

module.exports = async function loadDataCollection(dbName, name){
    const client = await connect();
    return await client.db(dbName).collection(name).find({}, {projection : {_id : 0, totalRestaurant: 1}}).limit(100).toArray();
}