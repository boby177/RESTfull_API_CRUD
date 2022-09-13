const express = require("express");
const cors = require("cors");

const app = express();

var corOptions = {
  origin: "http://localhost:3000",
};

// middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const router = require("./routes/productRouter");
app.use("/api/product", router);

// testing apis
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// port
const PORT = process.env.PORT || 3000;

// server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
