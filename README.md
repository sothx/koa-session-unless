# koa-session-unless
This module lets you authenticate HTTP requests using koa-session in your Koa (node.js) applications.

## Install

```shell
npm install koa-session-unless koa-session --save
```

## Usage

The koa-session authentication middleware authenticates callers using a session,you can conditionally run the `koa-session-unless` middleware under certain conditions.

Alternatively you can conditionally run the `jwt` middleware under certain conditions:

```javascript
let koa = require('koa');
let session = require('koa-session'); 
let sessionUnless = require('koa-session-unless'); 

let app = new Koa();

app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: true, /** (boolean) secure cookie*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.use(authSession([
    /^\/users\/login/, // Request Path
    /^\/users\/resetPassword/
],function  (ctx) {
    // Rsponse Body
  ctx.status = 401
  ctx.body = {
      statusCode: 999998,
      desc: 'no auth',
      result: {}
  }
}));

app.listen(3000);

```