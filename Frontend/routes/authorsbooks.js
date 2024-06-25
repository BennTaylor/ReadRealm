const express = require('express');
const router = express.Router();

router.get('/authorsbooks', (req, res) => {
  res.render('authorsbooks');
});

module.exports = router;