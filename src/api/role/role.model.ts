import mongoose from 'mongoose'
import { IRole, IRoleModel } from './role.interface'

const Schema = mongoose.Schema

/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface IRoleMongoose extends IRole, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface IRoleModelMongoose
    extends mongoose.Model<IRoleMongoose>,
        IRoleModel {}

/**
 * mongoose-schema of a role
 */
const roleSchema = new Schema({
    name: { type: String, unique: true, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
})

/**
 * mongoose-model of a role
 */
const Role = mongoose.model<IRoleMongoose, IRoleModelMongoose>(
    'Role',
    roleSchema
)
export { Role }
