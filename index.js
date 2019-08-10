const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/events');

const app = express();
app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

mongoose.connect(
  'mongodb://root:password1@ds243085.mlab.com:43085/jobscrape',
  { useNewUrlParser: true },
  () => console.log('MongoDB Connected'),
);

const PORT = process.env.PORT || 5000;

app.use('/events', eventRoutes);

app.listen(PORT, () => console.log('Application listening in port ', PORT));
