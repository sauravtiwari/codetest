const Event = require('../models/Events');
const User = require('../models/User');

module.exports = {
  addJobsEvent: async (req, res) => {
    const data = req.body;
    if (!data || !data.start || !data.end || !data.location || !data.user) {
      return res.status(500).json({
        success: false,
        message: 'Invalid Parameters',
      });
    }

    data.user = await User.findOne({ name: data.user });
    if (!data.user) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
      });
    }

    const dateStart = new Date(data.start);
    dateStart.setTime(
      dateStart.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );
    data.start = dateStart;

    const dateEnd = new Date(data.end);
    dateEnd.setTime(
      dateEnd.getTime() - new Date().getTimezoneOffset() * 60 * 1000,
    );

    data.end = dateEnd;

    const existingEvent = await Event.countDocuments({
      $and: [
        {
          'location.latLng.lng': data.location.latLng.lng,
          'location.latLng.lat': data.location.latLng.lat,
        },
        { start: { $gte: data.start } },
        { end: { $lte: data.end } },
      ],
    });
    if (existingEvent) {
      res.status(500).json({
        success: false,
        message: 'An Event already exists at this venue on this day',
      });
    } else {
      Event.create(data)
        .then((event) => {
          res.status(200).json({
            success: true,
            event,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'An Error Occured, please try again later',
          });
        });
    }
  },
  
  getAllEvents: async (req, res) => {
    Event.find({})
      .then((events) => {
        res.json({ success: true, events });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: 'An Error Occured, please try again later',
        });
      });
  },
};
