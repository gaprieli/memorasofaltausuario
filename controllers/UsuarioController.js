//importar o Model
import Usuario from '../models/usuario.js'

export default class UsuarioController{

    constructor(caminhoBase='usuario/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o usuario
           
            await Usuario.create({
                nome: req.body.nome,
                email:req.body.email,
                senha:req.body.senha,
                bio:req.body.bio,
                dataNascimento:req.body.dataNascimento,
                fotoPerfil: req.file ? req.file.buffer : null
            });
        
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Usuario.find({})
            res.render(caminhoBase + 'lst', {Usuarios:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Usuario.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Usuarios:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            const usuario = await Usuario.findById(id) 
            if (usuario) {
                res.render(caminhoBase + "edt", { Usuario: usuario });
            } else {
                // If user is not found, redirect to the list page
                res.redirect('/' + this.caminhoBase + 'lst');
            }
        }


        this.edt = async(req, res)=>{
        await Usuario.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Usuario.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
    
}