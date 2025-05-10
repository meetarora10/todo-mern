const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./config/db');
const restrictAccess = require('./middlewares/auth');
connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/todos', restrictAccess, require('./routes/todos'));
app.use('/api/auth', require('./routes/auth'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});