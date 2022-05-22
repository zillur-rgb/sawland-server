require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
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
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("<h1>Hello from Sawland</h1>");
});

app.listen(PORT, console.log(`App running on port ${PORT}`));
