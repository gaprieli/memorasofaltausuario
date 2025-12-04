import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import usuarioRoutes from './routes/UsuarioRoutes.js'; // rotas externas
import empresaRoutes from './routes/EmpresaRoutes.js'; // rotas externas
import lugarRoutes from './routes/LugarRoutes.js'; // rotas externas
import lembrancaRoutes from './routes/LembrancaRoutes.js'; // rotas externas
import memoraRoutes from './routes/MemoraRoutes.js'; // rotas externas




const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use('/usuario', usuarioRoutes)
app.use('/lugar', lugarRoutes)
app.use('/lembranca', lembrancaRoutes)
app.use('/memora', memoraRoutes)
app.use('/empresa', empresaRoutes)
app.use(routes)
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;