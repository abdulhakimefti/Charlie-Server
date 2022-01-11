const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//mongoDB connect
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.gkco6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database connect &  operation
async function run() {
  try {
    await client.connect();
    const database = client.db("CharlieServerA");
    const bannerCollection = database.collection("Banner");
    const jwelleryCollection = database.collection("jewllery");
    const tshirtCollection = database.collection("Tshirt");
    const kidsCollection = database.collection("Kids");

    // GEt API 1
    // GET API FOR BannerA
    app.get("/banner", async (req, res) => {
      const cursor = bannerCollection.find({});
      const bannerA = await cursor.toArray();
      res.json(bannerA);
    });

    // GET API 2
    // Load Jwellery
    app.get("/jwellery", async (req, res) => {
      const cursor = jwelleryCollection.find({});
      const product = await cursor.toArray();
      res.json(product);
    });
    //GET API 3
    // Load T Shirt
    app.get("/tshirt", async (req, res) => {
      const cursor = tshirtCollection.find({});
      const product = await cursor.toArray();
      res.json(product);
    });
    //GET API 4
    // Load Kids product
    app.get("/kids", async (req, res) => {
      const cursor = kidsCollection.find({});
      const product = await cursor.toArray();
      res.json(product);
    });

    app.post("/bannerPost", async (req, res) => {
      const bannerBody = req.body;
      const banner = await bannerCollection.insertOne(bannerBody);
      res.json(banner);
    });
    //POST API
    // POST JWELLERY
    app.post("/jwelleryPost", async (req, res) => {
      const jwelleryBody = req.body;
      const jwellery = await jwelleryCollection.insertOne(jwelleryBody);
      res.json(jwellery);
    });

    //   Update Api  1
    // Update Api for BannerA
    app.put("/banner/:bannerId", async (req, res) => {
      const id = req.params.bannerId;
      const updatedBanner = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedBanner.name,
          imgUrl: updatedBanner.imgUrl,
        },
      };
      const updateNow = await bannerCollection.updateOne(
        query,
        updateDoc,
        options
      );
      res.json(updateNow);
      console.log(updateNow);
    });
    //Update API 2
    //Jwellery API
    app.put("/jwellery/:productId", async (req, res) => {
      const id = req.params.productId;
      const updateProduct = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateData = {
        $set: {
          name: updateProduct.name,
          image: updateProduct.image,
          price: updateProduct.price,
          discount: updateProduct.discount,
          notun: updateProduct.notun,
          priceAfterDiscount: updateProduct.priceAfterDiscount,
        },
      };
      const updateNow = await jwelleryCollection.updateOne(
        query,
        updateData,
        options
      );
      res.json(updateNow);
    });
    //Update API 3
    //Tshirt API
    app.put("/tShirt/:productId", async (req, res) => {
      const id = req.params.productId;
      const updateProduct = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateData = {
        $set: {
          name: updateProduct.name,
          image: updateProduct.image,
          price: updateProduct.price,
          discount: updateProduct.discount,
          notun: updateProduct.notun,
          priceAfterDiscount: updateProduct.priceAfterDiscount,
        },
      };
      const updateNow = await tshirtCollection.updateOne(
        query,
        updateData,
        options
      );
      res.json(updateNow);
    });
    //Update API 4
    //Kids API
    app.put("/kids/:productId", async (req, res) => {
      const id = req.params.productId;
      const updateProduct = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateData = {
        $set: {
          name: updateProduct.name,
          image: updateProduct.image,
          price: updateProduct.price,
          discount: updateProduct.discount,
          notun: updateProduct.notun,
          priceAfterDiscount: updateProduct.priceAfterDiscount,
        },
      };
      const updateNow = await kidsCollection.updateOne(
        query,
        updateData,
        options
      );
      res.json(updateNow);
    });

    // DELTE API 1
    // DELETE API FOR BANNERA
    app.delete("/banner/:bannerId", async (req, res) => {
      const id = req.params.bannerId;
      const query = { _id: ObjectId(id) };
      const deleteBanner = await bannerCollection.deleteOne(query);
      res.json(deleteBanner);
    });
    //Delete Api 2
    //Jwellery Delete Api
    app.delete('/jwellery/:productId',async(req,res)=>{
      const id = req.params.productId;
      const query = {_id: ObjectId(id)};
      const deleteProduct = await jwelleryCollection.deleteOne(query);
      res.json(deleteProduct);
    })
    //Delete Api 3
    //Jwellery Delete Api
    app.delete('/tShirt/:productId',async(req,res)=>{
      const id = req.params.productId;
      const query = {_id: ObjectId(id)};
      const deleteProduct = await tshirtCollection.deleteOne(query);
      res.json(deleteProduct);
    })
    //Delete Api 4
    //Jwellery Delete Api
    app.delete('/kids/:productId',async(req,res)=>{
      const id = req.params.productId;
      const query = {_id: ObjectId(id)};
      const deleteProduct = await kidsCollection.deleteOne(query);
      res.json(deleteProduct);
    })
  } finally {
    // client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is the server for Charlie. The server is ready for use");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
