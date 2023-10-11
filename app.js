const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const connectToDatabase = require('./database/db')

const authRoutes = require('./api/routes/authRoutes')
const userRoutes = require('./api/routes/userRoutes')
const productRoutes = require('./api/routes/productRoutes')

app.use(express.json());

connectToDatabase();


app.use('api/', authRoutes) 
app.use('api/', userRoutes)
app.use('api/', userRoutes)
app.use('/api', productRoutes) // createProduct
app.use('/api/', productRoutes)// productDetails






// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
