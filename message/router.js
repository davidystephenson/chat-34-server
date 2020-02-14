const express = require('express')
const Message = require('./model')
const Sse = require('json-sse')

const { Router } = express

const stream = new Sse()

const router = Router()

// get on the stream
router.get(
  '/stream',
  (request, response, next) => {
    stream.updateInit('test')
    stream.init(request, response)
  }
)

router.get(
  '/message',
  async function (
    request, response, next
  ) {
    try {
      const messages = await Message        .findAll()
      
      response.send(messages)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/message',
  async function (
    request, response, next
  ) {
    try {
      const { body } = request
      const { text } = body
      const entity = { text }
      const message = await Message
        .create(entity)

      response.send(message)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
