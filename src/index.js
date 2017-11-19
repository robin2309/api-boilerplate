import Koa from 'koa';
import KoaRouter from 'koa-router';

import {getConfigs} from '../configs';
import {getLogger} from './utils/logger';
import controllers from './controllers';
import models from './models';

/* GLOBAL VARIABLES */
global.__CONFIG__ = getConfigs();
global.__LOGGER__ = getLogger(__CONFIG__.logger.level);

const app = new Koa();

__LOGGER__.info('Starting up API Hapta v1 ...');

/*app.use(async (ctx,next) => {
	console.log('HEY');
	await(next);
});*/
// models();
controllers(app);

/*const router = new KoaRouter();

router.get('/lol', function (ctx, next) {
  ctx.body = 'LOL';
});

app
  .use(router.routes())
  .use(router.allowedMethods());*/

app.listen(__CONFIG__.api.port);
__LOGGER__.info(`App listening on port ${__CONFIG__.api.port}`);