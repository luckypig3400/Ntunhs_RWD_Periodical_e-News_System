require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const APIRouter = require('./routes/api')
const { router: authRouter } = require('./routes/auth')

const port = process.env.PORT
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors({ credentials: true, origin: process.env.WEB_ORIGIN_URL }))
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('./public'))

app.use('/periodical/auth', authRouter)
app.use('/periodical/api', APIRouter)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
