const { clienteModel } = require("../models/clienteModel")

const clienteController = {

    mostrarClientes: async (req, res) => {
        try {

            const clientes = await clienteModel.buscarClientes();

            res.status(200).json(clientes);

        } catch (error) {
            console.error("Erro ao mostrar clientes: ", error);
            res.status(500).json({ erro: "Erro ao mostrar clientes." });
        }
    },

    cadastrarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || nomeCliente.trim() == "" || cpfCliente == undefined || cpfCliente == "", cpfCliente.length != 11) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            }

            if(cpfCliente == ){
                return res.status(409).json({ erro: "Esse CPF já está cadastrado!" });
            }

            await clienteModel.adicionarClientes(nomeCliente, cpfCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar clientes: ", error);
            res.status(500).json({ erro: "Erro ao cadastrar clientes." });
        }
    }

};

module.exports = { clienteController };