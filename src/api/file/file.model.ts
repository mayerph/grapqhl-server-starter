import mongoose from 'mongoose'
import { IFile, IFileModel } from './file.interface'

const Schema = mongoose.Schema
/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface IFileMongoose extends IFile, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface IFileModelMongoose
    extends mongoose.Model<IFileMongoose>,
        IFileModel {}

/**
 * mongoose-schema of a file
 */
const fileSchema = new Schema({
    name: { type: String },
    mimeType: { type: String },
    source: { type: String },
})

/**
 * mongoose-model of a file
 */
const File = mongoose.model<IFileMongoose, IFileModelMongoose>(
    'File',
    fileSchema
)
export { File }
