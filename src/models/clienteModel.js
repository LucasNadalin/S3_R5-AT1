const { sql, getConnection } = require("../config/db");

const clienteModel = {
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