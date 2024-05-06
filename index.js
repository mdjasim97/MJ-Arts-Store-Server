const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
    // jOb2CO9cH4IHadVf
    // mdjasim97



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const craftCollection = database.collection("craft-items")



        // all user find 
        app.get("/users", async(req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // User data create 
        app.post("/users", async(req, res) => {
            const reqBody = req.body
            const result = await userCollection.insertOne(reqBody)
            res.send(result)
        })


        // all craft item find 
        app.get("/", async(req, res) => {
            const cursor = craftCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        // craft item find by id 
        app.get("/craft/:id", async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.findOne(query)
            res.send(result)
        })


        // User data create 
        app.post("/craftAdd", async(req, res) => {
            const reqBody = req.body
            const result = await craftCollection.insertOne(reqBody)
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