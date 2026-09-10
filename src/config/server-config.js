
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    AEROBOOK_FLIGHT_SERVICE: process.env.AEROBOOK_FLIGHT_SERVICE,
    AEROBOOK_BOOKING_SERVICE: process.env.AEROBOOK_BOOKING_SERVICE,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
}