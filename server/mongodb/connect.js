const Mongo = require('mongodb');
const uri = 'mongodb://Raphael:QmSlDkFjwxcv1%24@cluster0-shard-00-00-lh1jt.mongodb.net:27017,cluster0-shard-00-01-lh1jt.mongodb.net:27017,cluster0-shard-00-02-lh1jt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';


module.exports = async function connectDb(){
    return await Mongo.MongoClient.connect(
        uri,
        {
            useNewUrlParser: true
        });
}