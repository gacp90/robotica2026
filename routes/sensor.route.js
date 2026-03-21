/** =====================================================================
 *  PAISES ROUTER 
=========================================================================*/
const { Router } = require('express');

// CONTROLLERS
const { postData, getLatest, getHistory } = require('../controllers/sensor.controller');


const router = Router();

/** =====================================================================
 *  GET QUERY
=========================================================================*/
router.post('/data', postData);

router.get('/latest/:dispositivo', getLatest);
router.get('/history/:dispositivo', getHistory);

/** =====================================================================
 *  GET ID
=========================================================================*/
//router.get('/historial/:dispositivo', getHistorial);

// EXPORT
module.exports = router;