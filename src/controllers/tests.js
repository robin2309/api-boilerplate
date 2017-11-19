import KoaRouter from 'koa-router';

export default (app, router) => {
	const testsRouter = new KoaRouter();

	testsRouter
		.get('/lol', ctx => {
			console.log('HEY')
			ctx.body = 'Tests router';
		})
	;

	__LOGGER__.info('Append routes for test controller');
	router.use('/tests', testsRouter.routes());
};