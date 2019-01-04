import mongoose from 'mongoose'
import { dbConfig } from './db.config'

const mongo = mongoose.connection

mongo.on('connected', () => {
    console.log('connected to mongodb!')
})

const uri: string =
    'mongodb://' +
    global.gConfig.database.host +
    ':' +
    global.gConfig.database.port +
    '/' +
    global.gConfig.database.db
const db = {
    connect: async () => {
        try {
            await mongoose.connect(
                uri,
                { useNewUrlParser: true, useCreateIndex: true }
            )
            if (global.gConfig.database.config) {
                await dbConfig(global.gConfig.database.drop)
            }
        } catch (err) {
            console.log(
                'connection to mongodb failed. Please make sure mongodb is running. ' +
                    err
            )
            setTimeout(() => {
                db.connect()
            }, 5000)
        }
    },
    disconnect: async () => {
        await mongoose.disconnect()
    },
    dropDatabase: async () => {
        await mongoose.connection.db.dropDatabase()
    },
}

export default db
