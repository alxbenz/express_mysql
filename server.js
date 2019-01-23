const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const times = require('lodash.times');
const random = require('lodash.random');
const db = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(express.static('app/public'));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/items', (req, res) =>
  db.WshlstItem.findAll().then(result => res.json(result))
);

app.get('/categories', (req, res) =>
  db.WshlstCategory.findAll().then(result => res.json(result))
);

app.post('/item', (req, res) =>
  db.WshlstItem.update(
    {
      reservedBy: req.body.reservedBy,
      isReserved: req.body.isReserved,
      isOpen: req.body.isOpen
    },
    { where: { itemId: req.body.itemId } }
  ).then(result => res.json(result))
);

db.sequelize.sync().then(() => {
  app.listen(4000, () => console.log('App listening on port 4000!'));
});
