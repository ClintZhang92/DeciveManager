const express = require('express');
const device_controller = require(`../controller/device.controller`);

const router = express.Router();

/** Get All Device Info */
router.get(`/`,device_controller.getAllDevice);

/** Get One Device Info From SN*/
router.get(`/:sn`,device_controller.getOneDevice);

/** Add Device */
router.post(`/`,device_controller.addDevice);

/** Update Device */
router.put(`/`, device_controller.updateDevice);

/** Delete Device */
router.delete(`/`,device_controller.deleteDevice);

module.exports = router;