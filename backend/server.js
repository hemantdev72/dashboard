const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {dbConnect} = require('./db/config');
const productRoutes = require('./routes/product.route');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConnect()

app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
