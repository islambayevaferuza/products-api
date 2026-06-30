import express from "express";

import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
