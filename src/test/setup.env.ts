import MongoMemoryServer from 'mongodb-memory-server'
import dotenv from 'dotenv'
import { finalConfig } from '../config/config'

dotenv.config({ path: '.env' })
global.gConfig = finalConfig

import db from '../db'

const mongod = {
    db: null,
    start: async () => {
        mongod.db = await new MongoMemoryServer({
            instance: {
                port: global.gConfig.database.port,
                dbName: global.gConfig.database.db,
            },
        })
    },
    stop: async () => {
        await mongod.db.stop()
    },
}

const mongoose = {
    start: async () => {
        await db.connect()
    },
    stop: async () => {
        await db.disconnect()
    },
    dropDatebase: async () => {
        await db.dropDatabase()
    },
}

const dbSetup = {
    open: async () => {
        await mongod.start()
        await mongoose.start()
    },
    close: async () => {
        await mongoose.stop()
        await mongod.stop()
    },
    drop: async () => {
        await mongoose.dropDatebase()
    },
}

export { dbSetup }

/*
const mongod = {
    db: null,
    start: async () => {
        mongod.db = await new MongoMemoryServer({
            instance: {
                port: global.gConfig.database.port,
                dbName: global.gConfig.database.db,
            },
        })
    },
    stop: async () => {
        await mongod.db.stop()
    },
    helloWorld: async () => {
        console.log('hello world')
    },
}

export { mongod }
*/
