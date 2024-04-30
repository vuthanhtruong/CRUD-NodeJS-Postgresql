var express = require('express');
var router = express.Router();

/* GET home page. */
const { Pool } = require('pg');

// Thông tin kết nối PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Anhnam123@',
  port: 5432, // Số cổng mặc định của PostgreSQL
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/xem');
 });

router.get('/them', function(req, res, next) {
  pool.query('SELECT idgianhang, tengianhang FROM gianhang', (err, dulieu1) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      res.render('sanpham/them', { title: 'Thêm dữ liệu đi anh em', data1: dulieu1.rows });
    }
  });
});

router.post('/them', function(req, res, next) {
  var id = req.body.id;
  var ten = req.body.ten;
  var mota = req.body.mota;
  var idgianhang = req.body.idgianhang;
  var anh = req.body.anh;
  var gia=req.body.gia;
  
  pool.query('INSERT INTO dochoi (ten, mota, id, anh, idgianhang, gia) VALUES ($1, $2, $3, $4, $5, $6)', [ten, mota, id, anh, idgianhang, gia], (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Query result:', result.rows);
    }
    res.redirect('/xem');
  });
});

router.get('/timkiem', function(req, res, next) {
  var timkiemnhe = req.query.timkiem;
  pool.query('SELECT * FROM dochoi WHERE ten = $1', [timkiemnhe], (err, dulieu1) => {
    if (err) {
      console.error('Lỗi khi thực hiện truy vấn:', err.stack);
      res.status(500).send('Đã xảy ra lỗi khi tìm kiếm.');
    } else {
      res.render('sanpham/xemtimkiem', { title: 'Thêm dữ liệu đi anh em', data1: dulieu1.rows });
    }
  });
});




router.get('/xem', function(req, res, next) {
  pool.query('SELECT * FROM dochoi', (err, dulieu) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Query result:', dulieu.rows);
      res.render('sanpham/xem', { title: 'Xem dữ liệu', data: dulieu.rows });
    }
  });
});

router.get('/xoa/:idcanxoa', function(req, res, next) {
  var idxoa = req.params.idcanxoa; 
  pool.query('DELETE FROM dochoi WHERE id = $1', [idxoa], (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
      // Xử lý lỗi ở đây
    } else {
      console.log('Deleted successfully');
      res.redirect('/xem');
    }
  });
});

router.get('/sua/:idcansua', function(req, res, next) {
  var idsua=req.params.idcansua;
  pool.query('SELECT * FROM dochoi WHERE id=$1', [idsua], (err, dulieu) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      pool.query('SELECT * FROM gianhang', (err, dulieu1) => {
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Query result:', dulieu.rows);
          res.render('sanpham/sua', { title: 'Xem dữ liệu', data1: dulieu.rows, data2: dulieu1.rows });
        }
      });
    }
  });
});

router.post('/sua/:idcansua', function(req, res, next) {
  var id = req.params.idcansua;
  var ten = req.body.ten;
  var mota = req.body.mota;
  var anh = req.body.anh;
  var idgianhang = req.body.idgianhang;
  var gia=req.body.gia;
  
  pool.query('UPDATE dochoi SET ten = $1, mota = $2, anh = $3, idgianhang = $4 , gia = $5 WHERE id = $6', [ten, mota, anh, idgianhang, gia, id], (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Updated successfully');
      res.redirect('/xem'); 
    }
  });
});

module.exports = router;
