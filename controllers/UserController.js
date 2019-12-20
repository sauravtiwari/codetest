const User = require('../models/User');
const Event = require('../models/Events');

module.exports = {
  createUser: async (req, res) => {

    const data = req.body;
    if (!data || !data.name) {
      res.status(500).json({
        success: false,
        message: 'Invalid parameters',
      });
    }
    const existingUser = await User.countDocuments({
      name: data.name,
    });

    if (existingUser) {
      res.status(500).json({
        success: false,
        message: 'A user already exists with this name',
      });
    } else {
      User.create(data)
        .then((user) => {
          res.status(200).json({
            success: true,
            user,
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
  getAllUsers: (req, res) => {
    User.aggregate([
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: 'user',
          as: 'events'
        }
      }
    ])
      .then((users) => {
        res.json({ success: true, users });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: 'An Error Occured, please try again later',
        });
      });
  },

  getUserEvents: async (req, res) => {
    if (!req.query || !req.query.name) {
      return res.status(500).json({
        success: false,
        message: 'Name parameter needs to be specified',
      });
    }

    const userId = await User.findOne({ name: req.query.name });
    const events = await Event.find({ user: userId });
    return res.json({ success: true, events });
  }
};
