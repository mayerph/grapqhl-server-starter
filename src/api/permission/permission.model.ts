import mongoose from 'mongoose'
import { IPermission, IPermissionModel } from './permission.interface'

const Schema = mongoose.Schema

interface IPermissionMongoose extends IPermission, mongoose.Document {}

// interface für statische Methoden
interface IPermissionModelMongoose
    extends mongoose.Model<IPermissionMongoose>,
        IPermissionModel {}

const permissionSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
})

const Permission = mongoose.model<
    IPermissionMongoose,
    IPermissionModelMongoose
>('Permission', permissionSchema)
export { Permission }
