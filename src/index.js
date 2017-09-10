import Koa from 'koa';
import configs from '../configs';
import logger from './logger';
import controllers from './controllers';

const app = new Koa();

__LOGGER__.info('Starting up API v1 ...');

controllers(app);

app.listen(__CONFIG__.api.port);
__LOGGER__.info(`App listening on port ${__CONFIG__.api.port}`);