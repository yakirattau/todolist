const { MongoClient } = require("mongodb");
const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function run() {
    try {
      const database = client.db('database');
      const usersCollection = database.collection('users');
      
      // Query for a user that has the name 'John'
      const query = { name: 'John' };
      const user = await usersCollection.findOne(query);

      console.log(user);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}

// run().catch(console.dir);


async function get() {
  try {
    const database = client.db('database');
    const usersCollection = database.collection('users');
    const users = await usersCollection.find().toArray();
    console.log(users);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// get().catch(console.dir);

async function post() {
  try {
    const database = client.db('database');
    const usersCollection = database.collection('users');
    await usersCollection.insertOne({
      name: "peter"
    });
    await usersCollection.insertMany([
      { name: "peter1" },
      { name: "peter2" }
    ]);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// post().catch(console.dir);

// const updateTodo = async (req, res) => {
//     const { id } = req.params;
//     const { username, title, progress } = req.body;

//     try {
//         const query = 'UPDATE todos SET (title, progress) = ($1, $2) WHERE id = $3 RETURNING *';
//         const ret = await pool.query(query, [title, progress, id]);
//         res.json(ret.rows[0]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//     }
// };

async function deleteDoc() {
  try {
    const database = client.db('database');
    const usersCollection = database.collection('users');
    await usersCollection.deleteOne({
      name: "peter"
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

deleteDoc().catch(console.dir);

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/databse')
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch(e => {
        console.log(e);
        return cb(e);
      })
  },
  getDb: () => dbConnection
}

// Should in server.js (or called from there)
// const { connectToDb, getDb } = require('./mongo.js');

// let db;
// connectToDb((e) => {
//     if (!e) {
//         // Start listening...
//         db = getDb();
//     } else {
//         // Handle error
//     }
// })