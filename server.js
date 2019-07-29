const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const times = require('lodash.times');
const random = require('lodash.random');
const db = require('./models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(express.static('app/public'));

app.use((req, res, next) => {
  // exclude OPTIONS request from auth
  if (req.method == 'OPTIONS') {
    next();
  }
  // authentication middleware

  const auth = { login: config.httpuser, password: config.httppwd };

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  // if (
  //   !login ||
  //   !password ||
  //   login !== auth.login ||
  //   password !== auth.password
  // ) {
  //   res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
  //   res.status(401).send('Authentication required.'); // custom message
  //   return;
  // }

  // Access granted...
  next();
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.corsOrigin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
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

app.get('/bnzstgrm/posts', (req, res) => {
  db.BnzstgrmPosts.findAll().then(result => res.json(result));
});

app.get('/bnzstgrm/posts/:limit/:offset', (req, res) => {
  db.BnzstgrmPosts.findAll({
    order: ['date'],
    limit: Number(req.params.limit),
    offset: Number(req.params.offset)
  }).then(result => res.json(result));
});

app.post('/bnzstgrm/new', (req, res) => {
  db.BnzstgrmPosts.create(Object.assign({}, req.body)).then(() => {
    db.BnzstgrmPosts.find({ where: { postId: req.body.postId } }).then(result =>
      res.json(result)
    );
  });
});

app.post('/bnzstgrm/remove', (req, res) => {
  db.BnzstgrmPosts.destroy({ where: { postId: req.body.postId } }).then(
    entry => {
      res.json(req.body.postId);
      console.log(res);
    }
  );
});

app.post('/bnzstgrm/update', (req, res) => {
  db.BnzstgrmPosts.find({ where: { postId: req.body.postId } }).then(entry => {
    entry
      .update({
        headline: req.body.headline,
        text: req.body.text,
        date: req.body.date,
        tags: req.body.tags
      })
      .then(result => {
        res.json(result);
      });
  });
});

db.sequelize.sync().then(() => {
  // DEMO CONTENT
  //   db.WshlstCategory.bulkCreate(
  //     times(3, () => ({
  //       categoryId: faker.random.uuid(),
  //       categoryLabel: faker.commerce.department()
  //     }))
  //   );

  // db.WshlstItem.bulkCreate(
  //   times(5, () => ({
  //     itemId: faker.random.uuid(),
  //     itemLink: faker.internet.url(),
  //     itemLabel: faker.commerce.productName(),
  //     itemDescription: faker.lorem.text(),
  //     itemPrice: 12345,
  //     itemImage: faker.image.imageUrl(),
  //     categoryId: 'faker.random.uuid',
  //     isOpen: false,
  //     isReserved: false,
  //     reservedBy: ''
  //   }))
  // );

  //   db.BnzstgrmPosts.bulkCreate(
  //     times(5, () => ({
  //       date: 1542495600000 + Math.round(100 * Math.random()),
  //       headline: faker.lorem.words(),
  //       isPublic: false,
  //       postId: faker.random.uuid(),
  //       text: faker.lorem.sentence() + '#wort #wort2' + faker.lorem.sentence(),
  //       imageSrc: `${faker.image.imageUrl()},${faker.image.imageUrl()}`,
  //       tags: `#wort,#wort2`
  //     }))
  //   );

  app.listen(port, () => console.log(`App listening on port ${port}!`));
});
