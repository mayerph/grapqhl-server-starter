import mongoose from 'mongoose'
import { IPermission, IPermissionModel } from './permission.interface'

const Schema = mongoose.Schema

/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface IPermissionMongoose extends IPermission, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface IPermissionModelMongoose
    extends mongoose.Model<IPermissionMongoose>,
        IPermissionModel {}

/**
 * mongoose-schema of a permission
 */
const permissionSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
})

/**
 * mongoose-model of a permission
 */
const Permission = mongoose.model<
    IPermissionMongoose,
    IPermissionModelMongoose
>('Permission', permissionSchema)
export { Permission }
