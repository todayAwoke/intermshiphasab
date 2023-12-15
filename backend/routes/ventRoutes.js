const express = require('express');
const { PostVent, ReadVent } = require('../controllers/ventController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
router.route('/post').post(PostVent)
router.route('/read').get(ReadVent)
module.exports = router