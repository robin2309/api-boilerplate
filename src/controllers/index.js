import KoaRouter from 'koa-router';
import tests from './tests';

export default app => {
	const restConfig = __CONFIG__.api;
  	const router = new KoaRouter({
    	prefix: restConfig.prefix + '/' + restConfig.version
  	});
  	tests(app, router);
  	app.use(router.routes());

  	const routerBadRequest = new KoaRouter({prefix: router.opts.prefix});
  	routerBadRequest
    	.get('/*'   , ctx => ctx.body = 'Bad request')
    	.post('/*'  , ctx => ctx.body = 'Bad request')
    	.put('/*'   , ctx => ctx.body = 'Bad request')
    	.delete('/*', ctx => ctx.body = 'Bad request')
  	;
  	app.use(routerBadRequest.routes());
}