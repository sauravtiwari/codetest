const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.post('/', EventController.addJobsEvent);
router.get('/', EventController.getAllEvents);

module.exports = router;