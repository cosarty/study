import Koa from 'koa'
import KoaRouter from 'koa-router'
import { virtualRouter } from './router/virtual'
import BodyParser from 'koa-bodyparser'
const app = new Koa()
const router = new KoaRouter()

app.use(BodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length,Authorization,Accept,X-Requested-With'
  )
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})



router.use(virtualRouter.routes(),virtualRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('项目启动!!!')
})
