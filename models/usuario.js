import conexao from '../config/conexao.js'

const Usuario = conexao.Schema({
    nome: {type:String, required:true},
    email:{type:String, required:true},
    senha:{type:String, required:true},
    bio:{type:String},
    dataNascimento:{type:Date},
    fotoPerfil:{type:Buffer, required:false,
                get: (valor) => {
                    if (!valor) return null;
                    return `data:image/png;base64,${valor.toString('base64')}`;
                }}
})

export default conexao.model('Usuario',Usuario)