const express = require('express')
const Channel = require('./model')
const Message = require('../message/model')

function factory (stream) {
  const { Router } = express

  const router = Router()

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
        const ref = await Channel
          .create(entity)

        const channel = await Channel
          .findByPk(ref.id, {
            include: [Message]
          })

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
