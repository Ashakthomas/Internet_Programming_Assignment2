const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.put('/confirm/:id', orderController.confirmOrder);

module.exports = router;
