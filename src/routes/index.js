const authRouter = require('./auth')
const messageRouter = require('./messages')

const router = require('express').Router()

router.get('/', (req, res) => { 
    res.send("API is working")
})
router.use('/login', authRouter)
router.use('/messages', messageRouter)

module.exports = router