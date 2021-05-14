import Router from 'express-promise-router';
import httpErrors from 'http-errors';

import { User } from '../../models';

const router = Router();

router.post('/signup', async (req, res) => {
  const { id: userId } = await User.create(req.body);

  const user = await User.findByPk(userId);

  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  res.cookie('userId', 'userId', {
    secure: true,
    httpOnly: true,
  });

  return res.status(200).type('application/json').send(user);
});

router.post('/signin', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user === null) {
    throw new httpErrors.BadRequest();
  }
  if (user.validPassword(req.body.password) === false) {
    throw new httpErrors.BadRequest();
  }

  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  res.cookie('userId', 'userId', {
    secure: true,
    httpOnly: true,
    expiryDate,
  });

  return res.status(200).type('application/json').send(user);
});

router.post('/signout', async (req, res) => {
  res.clearCookie('userId');
  return res.status(200).type('application/json').send({});
});

export { router as authRouter };
