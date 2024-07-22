const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const multer = require('multer');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Specify the filename format
  }
});

const upload = multer({ storage: storage });

// Create a new product with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = req.file.path; // Save file path to the product data
    }
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Read all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a product by ID
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
