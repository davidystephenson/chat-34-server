const express = require('express')
const cors = require('cors')
const messageRouter = require(
  './message/router'
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

app.use(messageRouter)

app.listen(port, onListen)
