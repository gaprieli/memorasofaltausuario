import conexao from '../config/conexao.js'
import mongoose from 'mongoose';

const Lugar = conexao.Schema({
    nome: {type: String, required: true},
    descricao: {type: String, required: false},
    localizacao: {type: String, required: false},
    empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true }
})

export default conexao.model('Lugar',Lugar)