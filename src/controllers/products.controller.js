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
