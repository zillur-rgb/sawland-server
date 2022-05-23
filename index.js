require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hordi.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(`Mongo DB running on ${uri}`);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const toolsCollection = client.db("sawland-db").collection("tools");
    const reviewsCollection = client.db("sawland-db").collection("reviews");
    const orderCollection = client.db("sawland-db").collection("orders");

    // Post an order
    app.post("/orders", async (req, res) => {
      const orderBody = req.body;
      const newOrder = await orderCollection.insertOne(orderBody);
      res.send(newOrder);
    });
    // getting all order
    app.get("/orders", async (req, res) => {
      const allOrders = await orderCollection.find({}).toArray();
      res.send(allOrders);
    });

    // PUT request in the tools to reduce stock and increase sold
    app.put("/tools/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBody = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedTool = {
        $set: { stock: updatedBody.stock, sold: updatedBody.sold },
      };
      const result = await toolsCollection.updateOne(
        filter,
        updatedTool,
        options
      );

      res.send(result);
    });
    // Getting all the tools
    app.get("/tools", async (req, res) => {
      const tools = await toolsCollection.find({}).toArray();
      res.send(tools);
    });

    // Getting all the reviews
    app.get("/reviews", async (req, res) => {
      const reviews = await reviewsCollection.find({}).toArray();
      res.send(reviews);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("<h1>Hello from Sawland</h1>");
});

app.listen(PORT, console.log(`App running on port ${PORT}`));
