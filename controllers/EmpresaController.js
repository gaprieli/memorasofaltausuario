//importar o Model
import Empresa from '../models/empresa.js'

export default class EmpresaController{

    constructor(caminhoBase='empresa/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria a empresa
           
            await Empresa.create({
                nome: req.body.nome,
                cnpj: req.body.cnpj,
                email:req.body.email,
                telefone:req.body.telefone,
                endereco:req.body.endereco
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Empresa.find({})
            res.render(caminhoBase + 'lst', {Empresas:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id;
            const empresa = await Empresa.findById(id);
            res.render(caminhoBase + "edt", { Empresa: empresa });
        }

        this.edt = async(req, res)=>{
            const id = req.params.id;
            await Empresa.findByIdAndUpdate(req.body.id, {
                nome: req.body.nome,
                cnpj: req.body.cnpj,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco
            });
            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            const id = req.params.id;
            await Empresa.findByIdAndDelete(id);
            res.redirect('/' + this.caminhoBase + 'lst');
        }
    }
}