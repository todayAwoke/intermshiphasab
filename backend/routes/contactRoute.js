const express = require('express');
const { CreateContact } = require('../controllers/ContactController');
const router = express.Router();

router.post('/create', CreateContact);
module.exports = router;