const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'anupreet26',
  password: 'hello@26',
  database: 'receipt_processor'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint: Process Receipts
app.post('/receipts/process', (req, res) => {
  const receipt = req.body;

  console.log(receipt);
  const id = generateId();

  connection.query('INSERT INTO receipts SET ?', { id, data: JSON.stringify(receipt) }, (error, results) => {
    if (error) {
      console.error('Error storing receipt in the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ id });
    }
  });
});

// Endpoint: Get Points
app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;

  console.log(id);
  connection.query('SELECT data FROM receipts WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error retrieving receipt from the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Receipt not found' });
    } else {
      const receipt = JSON.parse(results[0].data);
      const points = calculatePoints(receipt);
      res.json({ points });
      console.log(points);
    }
  });
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function calculatePoints(receipt) {
  let points = 0;
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
  points += receipt.total % 1 === 0 ? 50 : 0;
  points += receipt.total % 0.25 === 0 ? 25 : 0;
  points += Math.floor(receipt.items.length / 2) * 5;

  receipt.items.forEach(item => {
    if (item.shortDescription.trim().length % 3 === 0) {
      const price = parseFloat(item.price);
      const itemPoints = Math.ceil(price * 0.2);
      points += itemPoints;
    }
  });

  const purchaseTime = new Date(receipt.purchaseDate + 'T' + receipt.purchaseTime);
  const purchaseHour = purchaseTime.getHours();

  points += purchaseTime.getDate() % 2 === 1 ? 6 : 0;
  points += purchaseHour >= 14 && purchaseHour < 16 ? 10 : 0;

  return points;
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
