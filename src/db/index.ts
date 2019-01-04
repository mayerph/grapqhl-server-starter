import mongoose from 'mongoose'
import { dbConfig } from './db.config'

const mongo = mongoose.connection

mongo.on('connecting', () => {
    console.log('connecting to MongoDB...')
})

mongo.on('error', error => {
    mongoose.disconnect()
})
mongo.on('connected', () => {
    console.log('MongoDB connected!')
})
mongo.once('open', () => {
    console.log('MongoDB connection opened!')
})
mongo.on('reconnected', () => {
    console.log('MongoDB reconnected!')
})
mongo.on('disconnected', () => {
    console.log('MongoDB disconnected!')
    setTimeout(() => {
        db.connect()
    }, 5000)
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
                { useNewUrlParser: true }
            )
            if (global.gConfig.database.config) {
                await dbConfig(global.gConfig.database.drop)
            }
        } catch (err) {
            throw new Error(
                'connection to mongodb failed. Please make sure mongodb is running. ' +
                    err
            )
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
