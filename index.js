const express = require('express')
const app = express()
const port = 5000
const router = require('./routes')

app.use(express.json())


app.use('/api/v1', router)


app.listen(port, () => {
    console.log('listening on server ..')
})