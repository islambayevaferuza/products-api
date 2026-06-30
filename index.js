import express from "express";
import cors from "cors";

import "./src/initDb.js";

import productsRoutes from "./src/routes/products.route.js";

const app = express();

const PORT = 3000;

// Enable CORS
app.use(cors());

app.use(express.json());

app.use("/products", productsRoutes);

app.use("/uploads", express.static("src/uploads"));

app.get("/", (req, res) => {
  res.send("Products API working!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
