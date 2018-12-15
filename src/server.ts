// config
import dotenv from 'dotenv'
import { finalConfig } from './config/config'

dotenv.config({ path: '.env' })
global.gConfig = finalConfig

// imports
import express from 'express'
import cors from 'cors'
import http from 'http'
import { graphqlUploadExpress } from 'graphql-upload'
import apollo from './api/app'
import db from './db'

// database
db.connect()

// express
const app = express()
app.set('port', global.gConfig.server_port)
app.use('/static', express.static('public'))
app.use(cors())

app.use(
    graphqlUploadExpress({
        maxFileSize: global.gConfig.api.upload.maxFileSize,
        maxFiles: global.gConfig.api.upload.maxFiles,
    })
)
apollo.applyMiddleware({
    app,
    path: global.gConfig.api.endpoint,
})
const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

// starte http server
const server = httpServer.listen(app.get('port'), () => {
    console.log(
        'Apollo Server on http://localhost:',
        app.get('port'),
        '/graphql'
    )
})

export default server
