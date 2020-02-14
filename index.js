const express = require('express')

const app = express ()

const port = 4000

function onListen () {
  console.log(`Listening on :${port}`)
}

const jsonMiddleware = express
  .json()
app.use(jsonMiddleware)

app.post(
  '/message',
  function (request, response) {
    const { body } = request

    console
      .log('request.body test:', body)
  }
)


app.listen(port, onListen)
