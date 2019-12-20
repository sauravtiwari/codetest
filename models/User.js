const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const User = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);



module.exports = model('User', User);
