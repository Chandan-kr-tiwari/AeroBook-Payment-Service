const express = require('express');
const {PaymentController }  = require('../../controllers');
const Authenticate = require('../../middlewares/authenticate-middlewares')

const router = express.Router();

router.post('/', Authenticate,PaymentController.createPayment)
router.post('/verify',Authenticate, PaymentController.verifyPayment);
router.post('/refund/:bookingId',PaymentController.refundPayment);

module.exports=router