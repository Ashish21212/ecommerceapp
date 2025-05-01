const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth-routes')
const AdminProductsRouter = require('./routes/admin/products-routes')

mongoose.connect
('mongodb+srv://acpaashish44:bB3bJwoGfvVQdaqL@ecommerce.qcbtj.mongodb.net/')
.then(()=>console.log('Database Connected'))
.catch(err=>console.log(err))


const app = express()
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [ 
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma"
    ],
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/admin/products',AdminProductsRouter)
app.listen(PORT,()=> console.log("Server is running on port",PORT))