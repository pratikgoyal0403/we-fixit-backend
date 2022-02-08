const router = require('express').Router();

const appReviews = require('../controller/appReviews');

router.get('/app-reviews', appReviews.getReviews)


module.exports = router;