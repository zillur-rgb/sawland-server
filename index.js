require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
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
    const usersCollection = client.db("sawland-db").collection("users");
    const blogsCollection = client.db("sawland-db").collection("blogs");

    // Verify JWT
    const verifyJWT = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).send({
          message: "Unauthorized access",
        });
      }

      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, decoded) {
          if (err) {
            return res.status(403).send({
              message: "Forbidden access",
            });
          }
          req.decoded = decoded;
          next();
        }
      );
    };

    // Post a blog
    app.post("/blogs", verifyJWT, async (req, res) => {
      const body = req.body;
      const result = await blogsCollection.insertOne(body);
      res.send(result);
    });

    // get all blogs
    app.get("/blogs", async (req, res) => {
      const allBlogs = await blogsCollection.find({}).toArray();
      res.send(allBlogs);
    });

    // Get all the admin
    app.get("/users/admin", verifyJWT, async (req, res) => {
      const result = await usersCollection.find({ role: "admin" }).toArray();
      res.send(result);
    });

    // Find out if admin
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email: email });
      const isAdmin = user.role === "admin";
      res.send({ isAdmin: isAdmin });
    });

    // PUT request to make admin
    app.put("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const requester = req.decoded.email;
      const requesterInfo = await usersCollection.findOne({
        email: requester,
      });
      if (requesterInfo.role === "admin") {
        const filter = { email: email };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } else {
        res.status(403).send({
          message: "Forbidden",
        });
      }
    });

    // get single users
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    // delete single user
    app.delete("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // PUT request to the users
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedUser = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedUser,
        options
      );

      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.send({ result, token });
    });

    // get all the users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find({}).toArray();
      res.send(result);
    });

    // Post an order
    app.post("/orders", async (req, res) => {
      const orderBody = req.body;
      const newOrder = await orderCollection.insertOne(orderBody);
      res.send(newOrder);
    });

    // Getting single order info
    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.findOne(query);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const result = await orderCollection.find({}).toArray();
      res.send(result);
    });

    // Fetting specific order for user
    app.get("/orders/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const decodedEmail = req.decoded.email;
      if (email === decodedEmail) {
        const query = { email: email };
        const allOrders = await orderCollection.find(query).toArray();
        res.send(allOrders);
      } else {
        res.status(403).send({
          message: "Access Forbidden",
        });
      }
    });

    // Deleting an order
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
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
    app.get("/tools/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await toolsCollection.findOne(query);
      res.send(result);
    });
    // Getting all the tools
    app.get("/tools", async (req, res) => {
      const tools = await toolsCollection.find({}).toArray();
      res.send(tools);
    });

    // Psoting a new tool
    app.post("/tools", verifyJWT, async (req, res) => {
      const tool = req.body;
      const result = await toolsCollection.insertOne(tool);
      res.send(result);
    });

    // Posting a new review
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
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
