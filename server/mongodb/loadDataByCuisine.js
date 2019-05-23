var connect  = require('./connect')

module.exports = async function loadDataCuisine(dbName, name, regex){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).find({
        _id : {$regex: regex, $options:"i"}},
        {projection : {_id: 1}
        }).toArray();
    client.close();
    return response;
}