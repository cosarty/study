const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(async(ctx,next)=>{
	ctx.set('Access-Control-Allow-Origin','*')
	ctx.set('Access-Control-Allow-Headers','Content-Type,Content-Length,Authorization,Accept,X-Requested-With')
	ctx.set('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
	if(ctx.method=='OPTIONS'){
		ctx.body = 200;
	}else{
		await next()
	}
})
let router = new Router()
app.use(router.routes(), router.allowedMethods())
app.use(bodyParser())
let home = new Router({ prefix: '/home' })
home.get('/', (ctx) => {
  ctx.body = { message: '成功' }
})
router.use(home.routes(), home.allowedMethods())

app.listen(3000)
