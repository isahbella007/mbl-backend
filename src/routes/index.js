const authRouter = require('./auth')
const messageRouter = require('./messages')

const router = require('express').Router()

router.use('/login', authRouter)
router.use('/messages', messageRouter)

module.exports = router