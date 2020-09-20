const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./db/mongoConnect');
// Routes
const authRoute = require('./routes/users');
const postRoute = require('./routes/posts');

dotenv.config();

mongodb.checkConection();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(8000, () => console.log('Server online 🏃‍♂️'));
