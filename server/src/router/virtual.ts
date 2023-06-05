import KoaRouter from 'koa-router'
import virtual from '../mock/virtual.json'
const virtualRouter = new KoaRouter({ prefix: '/virtual' })

virtualRouter.get('/', (ctx) => {
  ctx.body = virtual
})

export { virtualRouter }
