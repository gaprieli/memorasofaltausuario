import Memora from '../models/memora.js'
import Lembranca from '../models/lembranca.js'
import Usuario from '../models/usuario.js';
import Lugar from '../models/lugar.js';
import Empresa from '../models/empresa.js';

export default class MemoraController{

    constructor(caminhoBase='memora/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            try {
                const usuarios = await Usuario.find({});
                const lugares = await Lugar.find({});
                const empresas = await Empresa.find({});
                console.log("Conteúdo de 'empresas' antes de renderizar:", empresas); // Add this line
                res.render(caminhoBase + "add", { usuarios: usuarios, lugares: lugares, empresas: empresas });
            } catch (error) {
                console.error("Erro ao buscar dados para o formulário de adição:", error);
                res.status(500).send("Erro ao carregar a página.");
            }
        }
        this.list = async(req, res)=>{
            console.log("Caminho base usado na listagem:", caminhoBase);
            const resultado = await Memora.find({}).populate('usuario').populate('empresa').populate('lugar');
            res.render(caminhoBase + 'lst', {memoras:resultado}) // Consider adding .sort({ data: -1 }) or similar
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await Memora.find({ titulo: { $regex: filtro, $options: "i" }}).populate('usuario').populate('empresa').populate('lugar').populate('lembrancas');
            // Consider adding .sort({ data: -1 }) or similar for consistent ordering
            res.render(caminhoBase + 'lst', {lembrancas:resultado})
        }
    }
}
