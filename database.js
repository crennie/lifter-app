

const MongoClient = require('mongodb').MongoClient;
const CONSTANTS = require('./constants');


function connect(callback) { // Callback gets (err, db) as arguments
  // Connect to the db
  MongoClient.connect(`${CONSTANTS.DATABASE_HOST}:${CONSTANTS.DATABASE_PORT}/${CONSTANTS.DATABASE_NAME}`, (err, client) => {
    if (err) {
      console.log(`Database connection error, not running callback.`, err);
      throw err;
    } else {
      callback(client, client.db(CONSTANTS.DATABASE_NAME));
    }
  });
}


class CollectionDriver {
  constructor(db) {
    this.db = db;
  };

  promisify(funcName) {
    return this[funcName](...args, () => Promise.resolve() );
  };

  getCollection(collectionName, callback) {
    this.db.collection(collectionName, function(error, the_collection) {
      if( error ) callback(error);
      else callback(null, the_collection);
    });
  };

  find(collectionName, query, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.find(query).toArray(function(error, results) { //B
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
  };

  findAll(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.find().toArray(function(error, results) { //B
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
  };

  findOne(collectionName, query, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.findOne(query, function(error, result) { //B
          if( error ) callback(error);
          else callback(null, result);
        });
      }
    });
  }
}

module.exports = {
  connect,
  CollectionDriver
}