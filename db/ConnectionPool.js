// File by Fengrui Gan
const { MongoClient } = require("mongodb");
require("dotenv").config();

// const uri = process.env.DB_URL || "mongodb://localhost:27017/pollMaster";
const uri = "mongodb://localhost:27017/pollMaster";
const DB_NAME = "pollMaster";

function ConnectionPool() {}

ConnectionPool.db = null;
ConnectionPool.client = null;

ConnectionPool.prototype.connect = async function (dbName) {
  if (ConnectionPool.isConnected) {
    return;
  }
  if (ConnectionPool.client === null) {
    ConnectionPool.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
      maxPoolSize: 3,
    });
  }
  await ConnectionPool.client.connect();
  if (ConnectionPool.db === null) {
    ConnectionPool.db = ConnectionPool.client.db(dbName);
  }
  ConnectionPool.isConnected = true;
};

ConnectionPool.prototype.getDB = function () {
  return ConnectionPool.db;
};

ConnectionPool.prototype.getClient = function () {
  return ConnectionPool.client;
};

module.exports = async () => {
  let pool = new ConnectionPool();
  await pool.connect(DB_NAME);
  return pool;
};
