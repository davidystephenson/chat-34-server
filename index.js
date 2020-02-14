const express = require('express')
const cors = require('cors')
const Sse = require('json-sse')
const messageFactory = require(
  './message/router'
)
const channelFactory = require(
  './channel/router'
)

const app = express ()

const port = 4000

function onListen () {
  console.log(`Listening on :${port}`)
}

const corsMiddleware = cors()
app.use(corsMiddleware)

const jsonMiddleware = express
  .json()
app.use(jsonMiddleware)

const stream = new Sse()

const messageRouter = messageFactory(
  stream
)
app.use(messageRouter)

const channelRouter = channelFactory(stream)
app.use(channelRouter)

app.listen(port, onListen)
