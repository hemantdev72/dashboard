const express = require('express');
const cors = require('cors');
const {dbConnect} = require('./db/config');
const productRoutes = require('./routes/product.route');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConnect()

app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
