import express from 'express';
const router = express.Router();

import EmpresaController from '../controllers/EmpresaController.js'
const controle = new EmpresaController();

router.get('/add', controle.openAdd)
router.post('/add', controle.add)
router.get('/lst', controle.list)
router.get('/del/:id', controle.del)
router.get('/edt/:id', controle.openEdt)
router.post('/edt/:id', controle.edt)
export default router