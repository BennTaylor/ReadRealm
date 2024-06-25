const express = require('express');
const router = express.Router();

router.get('/moderns', (req, res) => {
  res.render('moderns');
});

module.exports = router;