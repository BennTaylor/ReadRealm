const express = require('express');
const router = express.Router();

router.get('/usercreate', (req, res) => {
  res.render('usercreate');
});

module.exports = router;