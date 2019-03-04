// config
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { finalConfig } from './config/config'
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

// configuration of the graphql upload module
app.use(
    graphqlUploadExpress({
        maxFileSize: global.gConfig.api.upload.maxFileSize,
        maxFiles: global.gConfig.api.upload.maxFiles,
    })
)
// using apollo with express
apollo.applyMiddleware({
    app,
    path: global.gConfig.api.endpoint,
})
const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

// starting http server
const server = httpServer.listen(app.get('port'), () => {
    console.log(
        'Apollo Server on http://localhost:',
        app.get('port'),
        '/graphql'
    )
})

export default server
