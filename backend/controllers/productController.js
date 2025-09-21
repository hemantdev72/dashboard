const Product = require('../models/product.modal');

exports.getProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 6 } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, sustainabilityScore } = req.body;

    if (!name || !category || sustainabilityScore == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({ name, category, description, sustainabilityScore });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.getTopProducts = async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    const topProducts = await Product.find()
      .sort({ sustainabilityScore: -1 })
      .limit(parseInt(limit));

    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgScore: { $avg: '$sustainabilityScore' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

