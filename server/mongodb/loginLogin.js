var connect  = require('./connect')

module.exports = async function loadLogin(dbName, name, data){
    const client = await connect();
    const response =  await client.db(dbName).collection(name).find({
        email : data.username,
        mdp : data.password
    }, {
        projection : {_id: 1}
    }).limit(1).toArray();
    client.close();
    return response;
}