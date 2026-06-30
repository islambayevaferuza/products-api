import { products } from "../data/product.js";

import db from "../database/db.js";

// Hamma productni olish funksiyasi
export const getProducts = (req, res) => {
  let query = `
    SELECT * FROM products
    WHERE 1=1
  `;

  const params = [];

  // Search
  if (req.query.search) {
    query += ` AND title LIKE ?`;
    params.push(`%${req.query.search}%`);
  }

  // Category filter
  if (req.query.category) {
    query += ` AND category = ?`;
    params.push(req.query.category);
  }

  //  Price filter
  if (req.query.minPrice) {
    query += ` AND price >= ?`;
    params.push(req.query.minPrice);
  }

  if (req.query.maxPrice) {
    query += ` AND price <= ?`;
    params.push(req.query.maxPrice);
  }

  //   Rating filter
  if (req.query.rating) {
    query += ` AND rating >= ?`;
    params.push(req.query.rating);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      success: true,
      total: rows.length,
      data: rows,
    });
  });
};

// Get single product
export const getSingleProduct = (req, res) => {
  db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
    if (!err) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: row,
    });
  });
};

// create product
export const createProduct = (req, res) => {
  const { title, category, price, rating } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    `
      INSERT INTO products
      (
        title,
        category,
        price,
        rating,
        image
      )
      VALUES (?,?,?,?,?)
    `,
    [title, category, price, rating, image],
    function (err) {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        success: true,
        productId: this.lastID,
      });
    },
  );
};

// update product
export const updateProduct = (req, res) => {
  const id = Number(req.params.id);

  const productIndex = products.findIndex((mahsulot) => mahsulot.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product nod found",
    });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
  };

  res.json({
    message: "Product updated successfully",
    data: products[productIndex],
  });
};

// delete product
export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const productIndex = products.findIndex((mahsulot) => mahsulot.id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.json({
    message: "Product deleted successfully",
    data: deletedProduct[0],
  });
};
