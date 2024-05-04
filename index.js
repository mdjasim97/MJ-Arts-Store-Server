const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
    // jOb2CO9cH4IHadVf
    // mdjasim97



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mdjasim97:jOb2CO9cH4IHadVf@cluster0.wukjrsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("artDB")
        const userCollection = database.collection("users")

        app.get("/users", async(req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post("/users", async(req, res) => {
            const reqBody = req.body
            const result = await userCollection.insertOne(reqBody)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);









app.use("/", (req, res) => {
    res.send("Art & Craft Server Start.")
})


app.listen(port, () => {
    console.log("Server Runnnig port is : ", port)
})