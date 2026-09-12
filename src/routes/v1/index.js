const express = require('express');

const paymentRoutes = require('./payment');

const router = express.Router();


router.use('/payments', paymentRoutes);

module.exports = router;