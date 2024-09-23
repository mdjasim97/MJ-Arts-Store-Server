const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wukjrsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


        // User data create 
        app.post("/users", async(req, res) => {
            const reqBody = req.body
            const result = await userCollection.insertOne(reqBody)
            res.send(result)
        })


        // all craft item find 
        app.get("/craft", async(req, res) => {
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

        // craft item find by user email 
        app.get("/myCraft/:email", async(req, res) => {
            const email = req.params.email;
            console.log(email)
            const query = { user_email: req.params.email }
            const cursor = craftCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })


        // User data create 
        app.post("/craftAdd", async(req, res) => {
            const reqBody = req.body
            const result = await craftCollection.insertOne(reqBody)
            res.send(result)
        })


        // craft data update by id
        app.put("/update/:id", async(req, res) => {
            const id = req.params.id
            const reqBody = req.body
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }

            const updateCraft = {
                $set: {
                    item_name: reqBody.item_name,
                    subcategory_name: reqBody.subcategory_name,
                    short_description: reqBody.short_description,
                    price: reqBody.price,
                    rating: reqBody.rating,
                    customization: reqBody.customization,
                    processing_time: reqBody.processing_time,
                    stockStatus: reqBody.stockStatus,
                    user_name: reqBody.user_name,
                    user_email: reqBody.user_email,
                    image: reqBody.image,
                }
            }

            const result = await craftCollection.updateOne(query, updateCraft, options)
            res.send(result)
            console.log("update route hitting")
        })


        // craft data delete by id
        app.delete("/delete/:id", async(req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await craftCollection.deleteOne(query)
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
    res.send("art and craft server start now.")
})


app.listen(port, () => {
    console.log("Server Runnnig port is : ", port)
})