const mysql = require('mysql');
const database = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'student_score_ctr'
});
database.connect();
module.exports = database;