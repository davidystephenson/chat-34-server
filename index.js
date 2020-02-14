const express = require('express')
const cors = require('cors')
const Sse = require('json-sse')
const Channel = require('./channel/model')
const Message = require('./message/model')
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

// get on the stream
app.get(
  '/stream',
  async (request, response, next) => {
    try {
      const channels = await Channel
        .findAll({ include: [Message] })

      const action = {
        type: 'ALL_CHANNELS',
        payload: channels
      }

      const json = JSON
        .stringify(action)

      stream.updateInit(json)
      stream.init(request, response)
    } catch (error) {
      next(error)
    }
  }
)


const messageRouter = messageFactory(
  stream
)
app.use(messageRouter)

const channelRouter = channelFactory(stream)
app.use(channelRouter)

app.listen(port, onListen)
