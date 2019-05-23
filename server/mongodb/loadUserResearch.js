const connect  = require('./connect')

module.exports = async function loadUserResearch(dbName, name, id){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).find({id : id}).toArray();
    client.close();
    return response;
}