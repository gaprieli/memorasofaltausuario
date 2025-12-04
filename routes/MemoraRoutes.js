import express from 'express';
const router = express.Router();


import MemoraController from '../controllers/MemoraController.js'
const controle = new MemoraController();
const caminhobase = 'memora/'
router.get('/lst', controle.list)
router.post('/lst', controle.find)
export default router
