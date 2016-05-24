var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/mu';

router.get('/', function (req, res) {
 pg.connect(connectionString, function (err, client, done) {
   if (err) {
     res.sendStatus(500);
   }
console.log('get request ran!');
   client.query('SELECT first_name, last_name, ' + 'COUNT(orders.id) , customers.id FROM customers ' +
	'JOIN addresses ON customers.id = addresses.customer_id ' +
	'LEFT JOIN orders ON orders.address_id = addresses.id ' +
	'GROUP by customers.id', function (err, result) {
     done();

     res.send(result.rows);
   });
 });
});



router.post('/data/', function (req, res) {
 pg.connect(connectionString, function (err, client, done) {
   if (err) {
     res.sendStatus(500);
   }
console.log('Currently testing', req.body);
   client.query('SELECT customers.first_name, customers.last_name, orders.id, addresses.street, addresses.city, addresses.state, addresses.zip, products.description, line_items.unit_price, line_items.quantity, orders.order_date   FROM customers ' +
   'JOIN addresses ON customers.id = addresses.customer_id ' +
   'JOIN orders ON orders.address_id = addresses.id ' +
   'JOIN line_items ON orders.id = line_items.order_id ' +
   'JOIN products ON line_items.product_id = products.id ' +
   'WHERE customers.id =' + req.body.customerId +
   ' ORDER BY order_date ASC', function (err, result) {
     done();

     res.send(result.rows);
   });
 });
});






module.exports = router;
