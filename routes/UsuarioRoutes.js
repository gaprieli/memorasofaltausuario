import express from 'express';
const router = express.Router();
//Busca o Usuario Controller
import UsuarioController from '../controllers/UsuarioController.js'
import multer from 'multer';
const controle = new UsuarioController();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/add', controle.openAdd)
router.post('/add', upload.single('fotoPerfil'), controle.add)
router.get('/lst', controle.list)
router.post('/lst', upload.single('fotoPerfil'), controle.find)
router.get('/del/:id', controle.del)
router.get('/edt/:id', controle.openEdt)
router.post('/edt/:id', upload.single('fotoPerfil'), controle.edt)
export default router