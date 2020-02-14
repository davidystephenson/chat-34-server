const express = require('express')
const Message = require('./model')

function factory (stream) {
  const { Router } = express

  const router = Router()

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
          type: 'ONE_MESSAGE',
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

  return router
}

module.exports = factory
