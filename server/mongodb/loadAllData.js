var connect  = require('./connect')

module.exports = async function loadDataCollection(dbName, name){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).find({}).limit(100).toArray();
    client.close();
    return response;
}