import Koa from 'koa'
import koaStatic from 'koa-static'

let url = new URL(import.meta.url).pathname.split('/')
url.splice(-1, 1)
const test = url.join('/')

const app = new Koa()

app.use(koaStatic(test, {}));

app.listen(3000)
console.log('Listening op port 3000')
