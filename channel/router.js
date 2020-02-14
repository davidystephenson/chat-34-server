const express = require('express')
const Channel = require('./model')

function factory (stream) {
  const { Router } = express

  const router = Router()

  // get on the stream
  router.get(
    '/stream',
    async (request, response, next) => {
      try {
        const messages = await Message
          .findAll()

        const action = {
          type: 'ALL_MESSAGES',
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
    '/channel',
    async function (
      request, response, next
    ) {
      try {
        const { body } = request
        console.log('body test:', body)
        const { name } = body
        const entity = { name }
        const channel = await Channel
          .create(entity)

        const action = {
          type: 'ONE_CHANNEL',
          payload: channel
        }

        const json = JSON
          .stringify(action)

        stream.send(json)

        response.send(channel)
      } catch (error) {
        next(error)
      }
    }
  )

  return router
}

module.exports = factory
