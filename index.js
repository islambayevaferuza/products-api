import express from "express";

import productsRoutes from "./src/routes/products.route.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("Products API working!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
