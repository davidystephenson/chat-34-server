const express = require('express')
const Message = require('./model')
const Sse = require('json-sse')

const { Router } = express

const stream = new Sse()

const router = Router()

// get on the stream
router.get(
  '/stream',
  async (request, response, next) => {
    try {
      const messages = await Message
        .findAll()

      const action = {
        type: 'MESSAGES',
        payload: messages
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

      const action = {
        type: 'MESSAGE',
        payload: message
      }

      const json = JSON
        .stringify(action)

      stream.send(json)

      response.send(message)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
