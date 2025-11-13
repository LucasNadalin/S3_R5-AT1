const { clienteModel } = require("../models/clienteModel")

const clienteController = {

    /**
     * Controlador que lista todos os clientes cadastrados do banco de dados
     * @async
     * @function mostrarClientes
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP) 
     * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma reposta JSON com a lista de produtos.
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os produtos.
     * 
     */
    mostrarClientes: async (req, res) => {
        try {

            const clientes = await clienteModel.buscarClientes();

            res.status(200).json(clientes);

        } catch (error) {
            console.error("Erro ao mostrar clientes: ", error);
            res.status(500).json({ erro: "Erro ao mostrar clientes." });
        }
    },

    /**
   * Controlador que cria um novo produto no banco de dados
     * 
     * @async
     * @function cadastrarCliente
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP) 
     * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON.
     * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
     * @throws {409} Se houver a tentativa do cadastro de um CPF já existente no banco de dados
     * @throws {500} Se ocorrer qualquer erro interno no servidor.
     * 
     */
    cadastrarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            const verificacao = await clienteModel.buscarCpf(cpfCliente)

            if (nomeCliente == undefined || nomeCliente.trim() == "" || cpfCliente == undefined || cpfCliente == "", cpfCliente.length != 11) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" });
            }

            if (verificacao.length > 0) {
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