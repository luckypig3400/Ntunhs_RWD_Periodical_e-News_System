const express = require('express');
const router = express.Router();
const { APIRouter } = require('./api');

router.use('/api', APIRouter);

module.exports = router;
