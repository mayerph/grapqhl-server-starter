import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Role } from '../role/role.model'

const Schema = mongoose.Schema
import { IUser, IUserModel, comparePasswordFunction } from './user.interface'

// interface
interface IUserMongoose extends IUser, mongoose.Document {}

// interface für statische Methoden
interface IUserModelMongoose
    extends mongoose.Model<IUserMongoose>,
        IUserModel {}

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, dropDups: true },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password to short'],
    },
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        validate: {
            validator: v => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
                return emailRegex.test(v)
            },
            message: () => `no valid email address`,
        },
    },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    img: { type: Schema.Types.ObjectId, ref: 'File' },
})

userSchema.pre<IUserMongoose>('save', async function save(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    } else {
        const saltRounds = 10
        const hash = await bcrypt.hash(user.password, saltRounds)
        user.password = hash
        next()
    }
})

userSchema.pre<IUserMongoose>('save', async function save(next) {
    const user = this
    if (!user.role) {
        const role = await Role.findOne({ name: 'READER' })
        user.role = role
    }
    return next()
})

// methods
const comparePassword: comparePasswordFunction = async function(
    candidatePassword
) {
    return bcrypt.compare(candidatePassword, this.password)
}
userSchema.methods.comparePassword = comparePassword

const User = mongoose.model<IUserMongoose, IUserModelMongoose>(
    'User',
    userSchema
)
export default User
