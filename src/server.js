const http = require('http')
const util = require('util')

const App = require('./app')
const Config = require('./config')
const Controllers = require('./controllers')

const start = async () => {
  const dependencies = {}

  const config = Config()
  dependencies.config = config

  const controllers = Controllers(dependencies)
  Object.assign(dependencies, controllers)

  const app = App(dependencies)
  dependencies.app = app

  const server = http.createServer(app).listen({ ...config.httpServer })
  dependencies.server = server

  const { address, port } = server.address()

  let ip = address
  if (ip === '0.0.0.0' || ip === '::') ip = 'localhost'
  console.log(`Server listening at ${ip}:${port}`)

  return dependencies
}

const registerListeners = (dependencies) => {
  ['SIGINT', 'SIGUSR2'].forEach((sig) => {
    process.on(sig, () => {
      console.log(`Received signal '${sig}'`)
      terminate(dependencies)
    })
  })

  process.on('unhandledRejection', unhandledRejectionHandler(dependencies))

  process.on('uncaughtException', unhandledExceptionHandler(dependencies))
}

const unhandledRejectionHandler = (dependencies) => (reason, promise) => {
  console.error(`Unhandled rejection: ${util.inspect(promise)}`)
  terminate(dependencies)
}

const unhandledExceptionHandler = (dependencies) => (err, origin) => {
  console.error(`Uncaught exception: ${util.inspect(err)}; origin: ${origin}`)
  terminate(dependencies)
}

const terminate = async ({ server }) => {
  console.log('Stopping http server...')
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err)
      else resolve()
    })
  })
    .then(() => console.log('Http server stopped'))
    .catch((err) => console.warn(`Http server did not stop gracefully: ${util.inspect(err)}`))

  process.exit()
}

start()
  .then((dependencies) => registerListeners(dependencies))
  .catch((err) => {
    process.stderr.write(util.inspect(err))
    process.exit(err.errnum || 1)
  })
