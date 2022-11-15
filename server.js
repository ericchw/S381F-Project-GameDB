const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

const mongourl = 'mongodb+srv://game:game@cluster0.9ytrvti.mongodb.net/';
const dbName = 'game';
const client = new MongoClient(mongourl);

let _collection;

const mongodbConnect = (callback) => {
    client.connect((err) => {
        assert.equal(null, err);
        let db = client.db(dbName);
        _collection = db.collection("game")
        callback();
    })
}

const getCollection = () => {
    return _collection;
}

exports.mongodbConnect = mongodbConnect;
exports.getCollection = getCollection;