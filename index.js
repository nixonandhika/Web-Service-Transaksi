/* eslint-disable max-len */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
const PORT = process.env.PORT;


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    console.log('Mysql connected');
  }
});

app.get('/', (request, response)=>{
  response.send('<h1>TEST</h1>');
  console.log('get');
});

app.post('/createTransaction', (request, response)=>{
  response.setHeader('Content-Type', 'application/json');
  if (typeof request.body.id_pengguna === 'undefined') {
    response.json({
      status: false,
      message: 'id_pengguna is required',
    });
  } else if (typeof request.body.nomor_va === 'undefined') {
    response.json({
      status: false,
      message: 'nomor_va is required',
    });
  } else if (typeof request.body.id_film === 'undefined') {
    response.json({
      status: false,
      message: 'id_film account is required',
    });
  } else if (typeof request.body.jadwal_film === 'undefined') {
    response.json({
      status: false,
      message: 'jadwal_film account is required',
    });
  } else if (typeof request.body.no_kursi === 'undefined') {
    response.json({
      status: false,
      message: 'no_kursi account is required',
    });
  } else {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    query = `INSERT INTO \`transactions\`(\`id_pengguna\`, \`nomor_va\`, \`id_film\`, \`jadwal_film\`, \`no_kursi\`, \`waktu_transaksi\`, \`status\`)`;
    query += ` VALUES (${request.body.id_pengguna},${request.body.nomor_va},${request.body.id_film},'${request.body.jadwal_film}',${request.body.no_kursi},'${date}',0);`;
    db.query(query, (err, result)=>{
      if (err) {
        response.json({
          status: false,
          message: err.toString(),
        });
      } else { // asumsi nomor va unik untuk setiap transaksi
        query = `SELECT * FROM \`transactions\` WHERE nomor_va = ${request.body.nomor_va};`;
        db.query(query, (err, result)=>{
          if (err) {
            response.json({
              status: false,
              message: err.toString(),
            });
          } else {
            response.json({
              status: true,
              data: JSON.stringify(result),
              message: 'success insert transaction',
            });
          }
        });
      }
    });
  }
});

app.post('/changeStatus/:id_transaksi', (request, response)=>{
  response.setHeader('Content-Type', 'application/json');
  if (typeof request.params.id_transaksi === 'undefined') {
    response.json({
      status: false,
      message: 'id_transaksi required in url path',
    });
  } else if (typeof request.body.status === 'undefined') {
    response.json({
      status: false,
      message: 'status required in body',
    });
  } else {
    query = `UPDATE \`transactions\` SET \`status\`= ${request.body.status} WHERE id_transaksi = ${request.params.id_transaksi}`;
    db.query(query, (err, result)=>{
      if (err) {
        response.json({
          status: false,
          message: err.toString(),
        });
      } else { // asumsi nomor va unik untuk setiap transaksi
        response.json({
          status: true,
          message: 'success update transaction',
        });
      }
    });
  }
});

// get id_pengguna
app.get('/:id_pengguna', (request, response)=>{
  // akses id_pengguna = request.params.id_pengguna
});


app.listen(PORT, ()=>{
  console.log(`Server started in port ${PORT}`);
});


