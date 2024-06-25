const express = require('express');
const router = express.Router();

router.get('/reviews', (req, res) => {
  res.render('reviews');
});

module.exports = router;