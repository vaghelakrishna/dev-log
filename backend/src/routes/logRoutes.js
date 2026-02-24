const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController'); // Controller ko import karna

// POST request ke liye route banana
router.post('/', logController.createLog); // Jab /logs pe POST request aayegi, toh createLog function chalega


// GET route saare logs dekhne ke liye
router.get('/', logController.getLogs);
module.exports = router; // Router ko export karna taaki app.js mein use kar sake