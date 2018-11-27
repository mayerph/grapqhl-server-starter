import mongoose from 'mongoose'
import { IFile, IFileModel } from './file.interface'

const Schema = mongoose.Schema

interface IFileMongoose extends IFile, mongoose.Document {}
interface IFileModelMongoose
    extends mongoose.Model<IFileMongoose>,
        IFileModel {}

export type fileModel = mongoose.Document & {
    name: string
    mimeType: string
    user: number
}

const fileSchema = new Schema({
    name: { type: String },
    mimeType: { type: String },
    source: { type: String },
})

const File = mongoose.model<IFileMongoose, IFileModelMongoose>(
    'File',
    fileSchema
)
export { File }
