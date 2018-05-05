import express from 'express';

import testHandler from '../handlers/test';

const router = new express.Router();

router
  .route('/test')
  .get(testHandler);

export default router;
