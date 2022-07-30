const express = require('express');
const router = express.Router();
const controllerAddress = require('../controllers/address-controller');

router.get('/', controllerAddress.get_all_address);

router.get('/:addressId', controllerAddress.get_by_id);

router.post('/', controllerAddress.register_address);

router.patch('/:addressId', controllerAddress.update_address)

router.delete('/:addressId', controllerAddress.delete_address);

module.exports = router;