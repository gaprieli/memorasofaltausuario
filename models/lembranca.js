import conexao from '../config/conexao.js'

const Lembranca = conexao.Schema({
    titulo: { type: String, required: true },
    data: { type: Date, required: true },
    relato: { type: String, required: true },
    estrelas: { type: Number, required: true, min: 1, max: 5 },
    usuario: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    empresa: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    lugar: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Lugar',
        required: true
    }
})

export default conexao.model('Lembranca', Lembranca)