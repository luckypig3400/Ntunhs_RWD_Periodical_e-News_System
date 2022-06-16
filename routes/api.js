const express = require('express')
const router = express.Router()

const { verifyToken } = require('./auth')

const userRouter = require('./user')
const postRouter = require('./post')
const categoryRouter = require('./category')
const searchRouter = require('./search')
const announcementRouter = require('./announcement')
const uploadRouter = require('./upload')
const carouselRouter = require('./carousel')

router.use(verifyToken)

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/category', categoryRouter)
router.use('/search', searchRouter)
router.use('/announcement', announcementRouter)
router.use('/upload', uploadRouter)
router.use('/carousel',	carouselRouter)

module.exports = router
