// Import controllers
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");

// Import Router
const router = require("express").Router();

// Use Router
router.post("/addProduct", productController.addProduct);
router.get("/allProducts", productController.getAllProducts);
router.get("/published", productController.getPublishedProduct);

// Review URL and controller
router.post("/addReview", reviewController.addReview);
router.get("/allReviews", reviewController.getAllReviews);

// Get Product Reviews
router.get('/getProductReviews', productController.getProductReviews)

// Product Router
router.get("/:id", productController.getOneProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;