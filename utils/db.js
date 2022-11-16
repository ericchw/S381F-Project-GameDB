const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const mongourl = 'mongodb+srv://gamedb:gamedb@cluster0.z0zhbkh.mongodb.net/';
const dbName = 'gamedb';
const client = new MongoClient(mongourl);

let _collection;

//always only have one _db instance for handle mongodb query
const mongodbConnect = (callback) => {
    client.connect((err) => {
        assert.equal(null, err);
        let db = client.db(dbName);
        _collection = db.collection("app")
        callback();
    })
}

const getCollection = () => {
    return _collection;
}

exports.mongodbConnect = mongodbConnect;
exports.getCollection = getCollection;