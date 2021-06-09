const mysql = require('mysql');
export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'athenas_ecommerce_db',
});
