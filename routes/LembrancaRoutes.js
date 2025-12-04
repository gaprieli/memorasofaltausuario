import express from 'express';
const router = express.Router();

import LembrancaController from '../controllers/LembrancaController.js'
const controle = new LembrancaController();

router.get('/add', controle.openAdd)
router.post('/add', controle.add)
router.get('/lst', controle.list)
router.post('/lst', controle.find)
router.get('/del/:id', controle.del)
router.get('/edt/:id', controle.openEdt)
router.post('/edt/:id', controle.edt)
export default router
