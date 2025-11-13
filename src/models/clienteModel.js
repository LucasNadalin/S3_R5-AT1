const { sql, getConnection } = require("../config/db");

const clienteModel = {
    /**
     * Busca todos os produtos no banco de dados
     * 
     * @async
     * @function buscarClientes
     * @returns {Promise<Array>} Retorna uma lista com todos os clientes.
     * @throws mostra no console e propaga o erro caso a busca falhe.
     * 
     */
    buscarClientes: async () => {
        try {
            const pool = await getConnection();
            const querySQL = "SELECT * FROM Clientes"

            const result = await pool.request().query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes: ", error);
            throw error;
        }
    },

    /**
     * 
     * Retorna todos os dados de um cliente no banco de dados, usando um número de CPF que será fornecido
     * 
     * @async
     * @param {string} cpfCliente 
     * @returns {Promise<Array>}
     * @throws mostra no console e propaga o erro caso a busca falhe.
     */

    buscarCpf: async (cpfCliente) => {
        try {
            const pool = await getConnection();
            const querySQL = `
            SELECT * FROM Clientes
            WHERE cpfCliente = @cpfCliente
          `;

            const result = await pool.request()
            .input("cpfCliente", sql.Char, cpfCliente)
            .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar CPF dos clientes: ", error);
            throw error;
        }
    },

    /**
     * Insere um novo cliente no banco de dados
     * 
     * @async
     * @function adicionarClientes
     * @param {string} nomeCliente - Nome do cliente que será adicionado
     * @param {string} cpfCliente - CPF do cliente
     * @returns {Promise<void>} Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe.
     * 
     */
    adicionarClientes: async (nomeCliente, cpfCliente) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Clientes (nomeCliente, cpfCliente)
                VALUES (@nomeCliente, @cpfCliente)
            `

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);


        } catch (error) {
            console.error("Erro ao adicionar clientes: ", error);
            throw error;
        }
    }
}

module.exports = { clienteModel };