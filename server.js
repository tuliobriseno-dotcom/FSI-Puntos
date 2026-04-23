const express = require('express');
const { sql, getPool } = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mensaje: 'API funcionando 🚀'
    });
});

app.post('/saldo', async (req, res) => {
    try {
        const { tarjeta } = req.body;

        if (!tarjeta) {
            return res.status(400).json({ error: 'Falta tarjeta' });
        }

        const pool = await getPool();

        const result = await pool.request()
            .input('tarjeta', sql.VarChar, tarjeta)
            .query(`
                SELECT saldo
                FROM TU_TABLA
                WHERE TU_CAMPO_TARJETA = @tarjeta
            `);

        if (result.recordset.length === 0) {
            return res.json({ saldo: 0 });
        }

        res.json({ saldo: result.recordset[0].saldo });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error servidor' });
    }
});

app.listen(3001, () => {
    console.log('API corriendo en puerto 3001');
});