const getCollection = require("../utils/db").getCollection;
const assert = require("assert");
exports.create = (criteria, callback)=>{
    const collection = getCollection();
    collection.insertOne(criteria, (err, docs) =>{
        try{
            
            assert.equal(err,null);
            callback(docs.insertedId);
        }catch(error){
            callback(false)
        }
    })
}

exports.read = (criteria,projection,callback)=>{
    const collection = getCollection();
  
    if (criteria){
        let cursor = collection.find(criteria,projection)
        cursor.toArray((err,result) => {
            
            try{
                assert.equal(err,null);
                callback(result);
            }catch(error){
                callback(false);
            }
        });
    }
}
    // criteria, (err, docs) =>{
    //     try{
    //         assert.equal(err,null);
    //         callback(docs.ops[0]._id);
    //     }catch(error){
    //         callback(false)
    //     }
exports.delete =(criteria, callback)=>{
    const collection = getCollection();
    collection.deleteOne(criteria,(err,result)=>{
        try{
            
            assert.equal(err,null);
            callback(result)
        }catch(error){
            callback(false); 
        }
    });
}

    exports.update =(criteria,updateItem,callback)=>{
        const collection = getCollection();
        updateItem["_id"] = criteria["_id"]
        let cursor = collection.replaceOne(criteria,updateItem,(err,docs)=>{
            try{
            
                assert.equal(err,null);
                callback(docs);
            }catch(error){
                callback(false)
            }
        });
    }
