var express = require('express');
var router = express.Router();

const { Pool } = require('pg');

// Thông tin kết nối PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Anhnam123@',
  port: 5432, // Số cổng mặc định của PostgreSQL
});

router.get('/hienthinguoidung', function(req, res, next) {
    pool.query('SELECT * FROM dochoi', (err, dulieu) => {
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Query result:', dulieu.rows);
        res.render('hienthinguoidung/nguoidungxem', { title: 'Xem dữ liệu', data: dulieu.rows });
      }
    });
  });


  router.get('/chitietsanpham/:idsanpham', function(req, res, next) {
    var id = req.params.idsanpham; 
    if (!req.session.sanphamdaxem) {
      req.session.sanphamdaxem = [];
    }
    req.session.sanphamdaxem.push(id);

    pool.query('SELECT * FROM dochoi WHERE id = $1', [id], (err, dulieu) => {
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Query result:', dulieu.rows);
        res.render('hienthinguoidung/chitietsanpham', { title: 'Xem dữ liệu', data: dulieu.rows });
      }
    });
  });

  router.get('/sanphamdaxem', function(req, res, next) {
    pool.query('SELECT * FROM dochoi', (err, dulieu) => {
      if (err) {
        console.error('Error executing query', err.stack);
      } else {
        console.log('Query result:', dulieu.rows);
        res.render('hienthinguoidung/sanphamdaxem', { title: 'Xem dữ liệu', data: dulieu.rows, sanphamdaxem: req.session.sanphamdaxem});
      }
    });
});





module.exports = router;