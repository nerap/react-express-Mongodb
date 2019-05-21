const Mongo = require('mongodb');
const uri = "mongodb://localhost:27017";


module.exports = async function connectDb(){
    return await Mongo.MongoClient.connect(
        uri,
        {
            useNewUrlParser: true
        });
}