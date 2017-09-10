import Koa from 'koa';
import {getConfigs} from '../configs';
import {getLogger} from './utils/logger';
import controllers from './controllers';

/* GLOBAL VARIABLES */
global.__CONFIG__ = getConfigs();
global.__LOGGER__ = getLogger(__CONFIG__.logger.level);

const app = new Koa();


__LOGGER__.info('Starting up API v1 ...');

controllers(app);

app.listen(__CONFIG__.api.port);
__LOGGER__.info(`App listening on port ${__CONFIG__.api.port}`);