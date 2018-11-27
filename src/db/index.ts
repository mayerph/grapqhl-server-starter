import mongoose from "mongoose"
import { dbConfig } from './db.config'

const uri: string = 'mongodb://' + global.gConfig.database.host + ":" + global.gConfig.database.port + '/' + global.gConfig.database.db
const db = {
    connect: async () => {
        try {
            await mongoose.connect(uri)
            if (global.gConfig.database.config) {
                await dbConfig(global.gConfig.database.drop)
            }
        } catch (err) {
            throw new Error("connection to mongodb failed. Please make sure mongodb is running. " + err);
        }
        
    }
}

export default db