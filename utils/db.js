const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const mongourl = 'mongodb+srv://s1260229:s1260229@cluster0.yku7r.mongodb.net/';
const dbName = 's381fProject';
const client = new MongoClient(mongourl);

let _collection;

//always only have one _db instance for handle mongodb query
const mongodbConnect = (callback) => {
    client.connect((err) => {
        assert.equal(null, err);
        let db = client.db(dbName);
        _collection = db.collection("inventories")
        callback();
    })
}

const getCollection = () => {
    return _collection;
}

exports.mongodbConnect = mongodbConnect;
exports.getCollection = getCollection;