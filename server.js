const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// connect the database
const uri = process.env.DATABASE_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('EMS database connection established successfully!');
});

// setup routes
const productRouter = require('./routes/product.router');
const accountRouter = require('./routes/account.router');
const authRouter = require('./routes/auth.router');
const categoryRouter = require('./routes/category.router');
const searchRouter = require('./routes/search.router');

app.use('/api/products', productRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/search', searchRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
