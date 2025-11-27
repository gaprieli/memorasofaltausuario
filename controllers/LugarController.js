import Lugar from '../models/lugar.js';
import Empresa from '../models/empresa.js'; // Assuming you have an 'empresa' model

export default class LugarController {

    constructor(caminhoBase = 'lugar/') {
        this.caminhoBase = caminhoBase;

        this.openAdd = async (req, res) => {
            const empresas = await Empresa.find({});
            res.render(this.caminhoBase + "add", { empresas: empresas });
        };

        this.add = async (req, res) => {
            await Lugar.create(req.body);
            res.redirect('/' + this.caminhoBase + 'lst');
        };

        this.list = async (req, res) => {
            const resultado = await Lugar.find({}).populate('empresa');
            res.render(this.caminhoBase + 'lst', { Lugares: resultado });
        };

        this.find = async (req, res) => {
            const { criterio, valor } = req.body;
            const query = { [criterio]: { $regex: new RegExp(valor, 'i') } };
            const resultado = await Lugar.find(query).populate('empresa');
            res.render(this.caminhoBase + 'lst', { Lugares: resultado });
        };

        this.openEdt = async (req, res) => {
            try {
                const id = req.params.id;
                const lugar = await Lugar.findById(id);
                const empresas = await Empresa.find({}); // Fetch all companies

                console.log("Controller atualizado foi carregado! Enviando " + empresas.length + " empresas para a view.");
                if (lugar) {
                    // Pass BOTH the place and the list of companies to the view
                    res.render(this.caminhoBase + "edt", { Lugar: lugar, empresas: empresas });
                } else {
                    res.redirect('/' + this.caminhoBase + 'lst');
                }
            } catch (error) {
                console.error("Error in LugarController.openEdt:", error);
                res.status(500).send("An error occurred while trying to open the edit page.");
            }
        };

        this.edt = async (req, res) => {
            await Lugar.findByIdAndUpdate(req.body.id, req.body);
            res.redirect('/' + this.caminhoBase + 'lst');
        };

        this.del = async (req, res) => {
            await Lugar.findByIdAndDelete(req.params.id);
            res.redirect('/' + this.caminhoBase + 'lst');
        };
    }
}