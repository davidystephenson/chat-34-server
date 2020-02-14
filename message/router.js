const express = require('express')

const { Router } = express

const router = Router()

router.post(
  '/message',
  function (request, response) {
    const { body } = request

    console
      .log('request.body test:', body)
  }
)

module.exports = router
