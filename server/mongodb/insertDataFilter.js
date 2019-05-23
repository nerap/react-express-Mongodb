const connect  = require('./connect')

module.exports = async function insertDataFilter(dbName, name, data){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).insertOne(data);
    client.close();
    return response;
}