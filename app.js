const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./layered/routes/index');
const app = express();
const helmet = require('helmet');
const passport = require('passport');
const passports = require('./passpost/index');
const logger = require('./config/loggers');
const cors = require('cors');

app.use(
  session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
passports(passport);

app.use(cors({ origin: '*', credentials: true }));

app.get('/', (req, res) => {
  logger.info('GET /');
  res.sendStatus(200);
});

app.get('/error', (req, res) => {
  logger.error('Error message');
  res.sendStatus(500);
});

// XSS 공격 방어
app.use(helmet());
app.use(helmet.xssFilter());

const port = process.env.PORT;
app.use(express.json());

app.use('/api', express.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(port, () => {
  console.log(port, ' server is opened');
});
