import mongoose from 'mongoose'
import { dbConfig } from './db.config'

const mongo = mongoose.connection

// if connected to mongoDB write to terminal.
mongo.on('connected', () => {
    console.log('connected to mongodb!')
})

// creates uri to database
const uri: string =
    'mongodb://' +
    global.gConfig.database.host +
    ':' +
    global.gConfig.database.port +
    '/' +
    global.gConfig.database.db

/**
 * database object for managing the connection
 */
const db = {
    /**
     * connect to mongoDB
     */
    connect: async () => {
        try {
            await mongoose.connect(
                uri,
                { useNewUrlParser: true, useCreateIndex: true }
            )
            // create default database entries
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
    /**
     * disconnect from the database
     */
    disconnect: async () => {
        await mongoose.disconnect()
    },
    /**
     * drop database connection
     */
    dropDatabase: async () => {
        await mongoose.connection.db.dropDatabase()
    },
}

export default db
