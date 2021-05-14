import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
// import session from 'express-session';
import cors from 'cors';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = Express();

app.set('trust proxy', true);

// app.use(
//   session({
//     proxy: true,
//     resave: false,
//     saveUninitialized: false,
//     secret: 'secret',
//   }),
// );
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));
app.use(cookieParser());

// const allowCrossOrigin = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://web-speed-hackathon-2021-keiya01.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   // TODO: should be fixed
//   res.header('Access-Control-Allow-Credentials', 'true');

//   // intercept OPTIONS method
//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// };

app.use(
  cors({
    origin: 'https://web-speed-hackathon-2021-keiya01.vercel.app',
    credentials: true,
  }),
);

// app.use((_req, res, next) => {
//   res.header({
//     'Cache-Control': 'max-age=0, no-transform',
//     Connection: 'close',
//   });
//   return next();
// });

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
