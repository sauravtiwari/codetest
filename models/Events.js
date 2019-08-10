const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    end: { type: Date, required: true },
    start: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      latLng: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model('Events', EventSchema);

module.exports = Event;
