import mongoose from 'mongoose'
import { IRole, IRoleModel } from './role.interface'

const Schema = mongoose.Schema

interface IRoleMongoose extends IRole, mongoose.Document {}

// interface für statische Methoden
interface IRoleModelMongoose
    extends mongoose.Model<IRoleMongoose>,
        IRoleModel {}

const roleSchema = new Schema({
    name: { type: String, unique: true, required: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
})

const Role = mongoose.model<IRoleMongoose, IRoleModelMongoose>(
    'Role',
    roleSchema
)
export { Role }
