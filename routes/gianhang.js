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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Gian hang page');
});

router.get('/themgianhang', function(req, res, next) {
    res.render('gianhang/themgianhang', { title: 'Thêm dữ liệu đi anh em' });
});

router.post('/themgianhang', function(req, res, next) {
    var id = req.body.id;
    var ten = req.body.ten;
    pool.query('INSERT INTO gianhang (idgianhang, tengianhang) VALUES ($1, $2)', [id, ten], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Query result:', result.rows);
        }
        res.redirect('/gianhang/xemgianhang');
    });
});

router.get('/xemgianhang', function(req, res, next) {
    pool.query('SELECT * FROM gianhang', (err, dulieu) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Query result:', dulieu.rows);
            res.render('gianhang/xemgianhang', { title: 'Xem dữ liệu', data1: dulieu.rows });
        }
    });
});

router.get('/xoagianhang/:idcanxoa', function(req, res, next) {
    var idxoagianhang = req.params.idcanxoa;
    pool.query('DELETE FROM gianhang WHERE idgianhang = $1', [idxoagianhang], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Deleted successfully');
            res.redirect('/gianhang/xemgianhang');
        }
    });
});


router.get('/suagianhang/:idcansua', function(req, res, next) {
    var idsuagianhang = req.params.idcansua;
    pool.query('SELECT * FROM gianhang WHERE idgianhang = $1', [idsuagianhang], (err, dulieu) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Query result:', dulieu.rows);
            res.render('gianhang/suagianhang', { title: 'Sửa gian hàng', data1: dulieu.rows });
        }
    });
});

router.post('/suagianhang/:idcansua', function(req, res, next) {
    var id = req.params.idcansua;
    var ten = req.body.ten;

    pool.query('UPDATE gianhang SET tengianhang = $1 WHERE idgianhang = $2', [ten, id], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Updated successfully');
            res.redirect('/gianhang/xemgianhang');
        }
    });
});

module.exports = router;
