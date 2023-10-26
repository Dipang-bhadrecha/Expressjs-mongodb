const express = require('express');
const app = express();
// app.use(cookieParser());
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./database/db')

// const passport = require('passport');

// Import your route
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const productRoutes = require('./api/routes/productRoutes');
const adminRoutes = require('./api/routes/adminRouter');

app.use(express.json());
connectToDatabase();


//Use specific endpoints for each routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/admin', adminRoutes);



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

