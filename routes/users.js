const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/createUser', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/getUserEvents', UserController.getUserEvents);

module.exports = router;