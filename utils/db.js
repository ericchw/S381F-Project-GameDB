require('dotenv').config()
// console.log(process.env)

const MongoClient = require("mongodb-legacy").MongoClient;
const assert = require('assert');

const mongourl = process.env.MONGOURL; //mongodb+srv://[username]:[password]@cluster0.[dbid].mongodb.net/
const dbName = process.env.DBNAME;
const collection = process.env.DBCONNECTION;
const client = new MongoClient(mongourl);

let _collection;

//always only have one _db instance for handle mongodb query
const mongodbConnect = (callback) => {
    client.connect((err) => {
        assert.equal(null, err);
        let db = client.db(dbName); //gamedb
        _collection = db.collection(collection) //games
        callback();
    })
}

const getCollection = () => {
    return _collection;
}

exports.mongodbConnect = mongodbConnect;
exports.getCollection = getCollection;