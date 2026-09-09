const express = require('express');
const {PaymentController }  = require('../../controllers');

const router = express.Router();

router.post('/',PaymentController.createPayment)

module.exports=router