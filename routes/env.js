var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/env', function(req, res, next) {
  res.json({
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID
  })
});

module.exports = router;