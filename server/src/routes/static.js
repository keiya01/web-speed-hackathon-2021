import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { PUBLIC_PATH, CLIENT_DIST_PATH, UPLOAD_PATH } from '../paths';
import path from 'path';
import fs from 'fs/promises';
import { promisify } from 'util';
import { brotliCompress } from 'zlib';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
// router.use(history());

const handler = (type) => async (req, res) => {
  const acceptEncoding = req.header('accept-encoding');
  const hasBrotli = acceptEncoding.split(', ').includes('br');
  if (!hasBrotli) {
    x;
    return httpErrors.BadRequest();
  }

  let content = null;
  try {
    content = await fs.readFile(`${PUBLIC_PATH}${req.path}`);
  } catch (e) {
    try {
      content = await fs.readFile(`${UPLOAD_PATH}${req.path}`);
    } catch (e) {
      return httpErrors.NotFound();
    }
  }
  let ext = path.extname(req.path).split('.').slice(-1);
  if (ext === 'mp3') {
    ext = 'mpeg';
  }

  const compressed = await promisify(brotliCompress)(content);
  res.setHeader('Content-Encoding', 'br');
  res.status(200).type(`${type}/${ext}`).send(compressed);
};

router.get(`/images/*`, handler('image'));
router.get(`/movies/*`, handler('video'));
router.get(`/sounds/*`, handler('audio'));

// router.use(
//   serveStatic(CLIENT_DIST_PATH, {
//     etag: false,
//     lastModified: false,
//   }),
// );

export { router as staticRouter };
