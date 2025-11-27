import Lembranca from '../models/lembranca.js'
import Usuario from '../models/usuario.js';
import Lugar from '../models/lugar.js';
import Empresa from '../models/empresa.js';

export default class LembrancaController{

    constructor(caminhoBase='lembranca/'){
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
                // Optionally, render an error page or send an error response
                res.status(500).send("Erro ao carregar a página.");
            }
        }
        this.add = async(req, res)=>{
            await Lembranca.create({
                titulo: req.body.titulo,
                usuario: req.body.usuario,
                empresa: req.body.empresa,
                lugar: req.body.lugar,
                data: req.body.data,
                relato: req.body.relato,
                estrelas: req.body.estrelas,
            });
            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Lembranca.find({}).populate('usuario').populate('empresa').populate('lugar');
            res.render(caminhoBase + 'lst', {lembrancas:resultado}) // Consider adding .sort({ data: -1 }) or similar
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            // Changed 'nome' to 'titulo' and ensured consistent variable name 'lembrancas'
            const resultado = await Lembranca.find({ titulo: { $regex: filtro, $options: "i" }}).populate('usuario').populate('empresa').populate('lugar');
            // Consider adding .sort({ data: -1 }) or similar for consistent ordering
            res.render(caminhoBase + 'lst', {lembrancas:resultado})
        }
        this.openEdt = async(req, res)=>{
            const id = req.params.id;
            const [lembranca, usuarios, lugares, empresas] = await Promise.all([
                Lembranca.findById(id),
                Usuario.find({}),
                Lugar.find({}),
                Empresa.find({})
            ]);
            res.render(caminhoBase + "edt", { lembranca, usuarios, lugares, empresas });
        }
        this.edt = async(req, res)=>{
            await Lembranca.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/'+caminhoBase + 'lst');
            
            }
        this.del = async(req, res)=>{
            await Lembranca.findByIdAndDelete(req.params.id)
            res.redirect('/'+caminhoBase + 'lst');
            
        }
    }
}
