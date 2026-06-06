import { products } from "../data/product.js";

// Hamma productni olish funksiyasi
export const getProducts = (req, res) => {
  let result = [...products];

  // Search
  if (req.query.search) {
    result = result.filter((mahsulot) =>
      mahsulot.title.toLowerCase().includes(req.query.search.toLowerCase()),
    );
  }

  // Category filter
  if (req.query.category) {
    result = result.filter(
      (mahsulot) =>
        mahsulot.category.toLowerCase() === req.query.category.toLowerCase(),
    );
  }

  //  Price filter
  if (req.query.minPrice) {
    result = result.filter(
      (mahsulot) => mahsulot.price >= Number(req.query.minPrice),
    );
  }

  if (req.query.maxPrice) {
    result = result.filter(
      (mahsulot) => mahsulot.price <= Number(req.query.maxPrice),
    );
  }

  //   Rating filter
  if (req.query.rating) {
    result = result.filter(
      (mahsulot) => mahsulot.rating >= Number(req.query.rating),
    );
  }

  res.json({
    success: true,
    total: result.length,
    data: result,
  });
};

// Get single product
export const getSingleProduct = (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((mahsulot) => mahsulot.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
};

// create product
export const createProduct = (req, res) => {
  const product = req.body;

  product.id = products.length + 1;

  products.push(product);

  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
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
