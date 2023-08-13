const router = require('express').Router();
const { validateProfileUpdate } = require('../utils/regex');
const { updateProfileUser, getUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateProfileUpdate, updateProfileUser);

module.exports = router;
