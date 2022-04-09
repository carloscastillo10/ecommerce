const { Client } = require('pg');

async function getConnection() {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'ecommerce_admin',
        password: 'admin123',
        database: 'ecommerce',
    });
    await client.connect();
    return client;
}

module.exports = getConnection;
