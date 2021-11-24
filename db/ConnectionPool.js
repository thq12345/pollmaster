// File by Fengrui Gan
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.DB_URL;
const DB_NAME = "poll_master";

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
  await ConnectionPool.client.client();
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
