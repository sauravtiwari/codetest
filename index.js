require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', () => console.log('MongoDB not running'));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', eventRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => console.log('Application listening in port ', PORT));

module.exports = app;