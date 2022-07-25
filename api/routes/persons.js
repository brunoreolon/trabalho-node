const express = require('express');
const router = express.Router();
const controllerPerson = require('../controllers/person-controller');

router.get('/', controllerPerson.get_all_persons);

router.get('/:personId', controllerPerson.get_by_id);

router.post('/', controllerPerson.register_person);

router.patch('/:personId', controllerPerson.update_person);

router.delete('/:personId', controllerPerson.delete_person);

module.exports = router;