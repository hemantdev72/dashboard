const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getCategoryStats
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/stats', getCategoryStats);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
