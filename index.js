async function isUnLess(ctx, next, unless,callback) {
  let onUnless =  unless.some((v, i, a) => {
    return unless[i].test(ctx.request.url)
  })
  if (JSON.stringify(ctx.session) === '{}' && !onUnless) {
    callback(ctx)
  } else {
    await next()
  }
}

module.exports = function (unless, callback) {
  return async function (ctx, next) {
        await isUnLess(ctx, next, unless,callback)
  }
}