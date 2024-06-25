const express = require('express');
const router = express.Router();

router.get('/gpdata', (req, res) => {
  res.render('gpdata');
});

module.exports = router;