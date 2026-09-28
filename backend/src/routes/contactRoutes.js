const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitContact);
router.get('/', contactController.getContacts);
router.put('/:id/status', contactController.updateContactStatus);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
