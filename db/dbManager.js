// By Fengrui Gan and Felix Chung
const ConnectionPool = require("./ConnectionPool");
const { ObjectId } = require("mongodb");

const getDBCollection = async (collectionName) => {
  const conn = await ConnectionPool();
  return conn.getDB().collection(collectionName);
};

const create = async (collectionName, data, objectId) => {
  const collection = await getDBCollection(collectionName);
  if (objectId) data._id = new ObjectId(objectId);
  await collection.insertOne(data);
};

const read = async (collectionName, query, callbackChain) => {
  if (typeof query !== "object") {
    throw new TypeError("Query Expression is not an object");
  }
  const collection = await getDBCollection(collectionName);
  let res = collection.find(query);

  // abstracting method chainning
  // hoping to improve reusability
  if (callbackChain) {
    if (typeof callbackChain !== "object") {
      throw new TypeError("Callback chain must be an object with callback as key and params array as value");
    }
    for (let cb in callbackChain) {
      if (res[cb]) {
        res = res[cb].apply(res, callbackChain[cb]);
      }
    }
  }
  res = res.toArray();
  return await res;
};

const update = async (collectionName, filter) => {
  if (typeof filter !== "object") {
    throw new TypeError("Filter Expression is not an object");
  }
  const collection = await getDBCollection(collectionName);
  await collection.updateOne(filter);
};

const destroy = async (collectionName, filter) => {
  if (typeof filter !== "object") {
    throw new TypeError("Query Expression is not an object");
  }
  const collection = await getDBCollection(collectionName);
  await collection.deleteOne(filter);
};

module.exports = { create, read, update, destroy };
