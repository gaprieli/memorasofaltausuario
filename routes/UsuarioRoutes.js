import express from 'express';
const router = express.Router();
//Busca o Usuario Controller
import UsuarioController from '../controllers/UsuarioController.js'
import multer from 'multer';
const controle = new UsuarioController();

const caminhobase = 'usuario/'

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('fotoPerfil'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', upload.single('fotoPerfil'), controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('fotoPerfil'), controle.edt)
export default router