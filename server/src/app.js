import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import cors from 'cors';

import { apiRouter } from './routes/api';
// import { staticRouter } from './routes/static';

const app = Express();

app.set('trust proxy', true);

const corsOptions = {
  origin: 'https://web-speed-hackathon-2021-keiya01.vercel.app',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use((_req, res, next) => {
  res.header({
    'Cache-Control': 'max-age=0, no-transform',
    Connection: 'close',
  });
  return next();
});

app.use('/api/v1', apiRouter);
// app.use(staticRouter);

export { app };
