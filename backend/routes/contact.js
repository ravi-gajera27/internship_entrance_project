const router = require('express').Router();
const contact = require('../controllers/contact');

router.get('/getContacts', contact.getContacts);
router.post('/addContact', contact.addContact);
router.post('/updateContact/:id',  contact.updateContact);
router.delete('/removeContact/:id', contact.deleteContact);

module.exports = router;