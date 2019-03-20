import User from '../../api/user/user.model'
import { Role } from '../../api/role/role.model'

// deletes all user in the database
const dropUser = async () => {
    await User.deleteMany({}).exec()
}

// creates the default user in the database.
const createUser = async () => {
    let admin
    let reader

    admin = await User.findOne({ username: 'admin' }).exec()
    if (!admin) {
        const role = await Role.findOne({ name: 'ADMIN' }).exec()
        admin = new User({
            username: 'admin',
            password: 'sterne123',
            email: 'admin@hm.edu',
            role,
        })
        admin.save()
    }

    reader = await User.findOne({ username: 'reader' }).exec()

    if (!reader) {
        const role = await Role.findOne({ name: 'READER' }).exec()
        reader = new User({
            username: 'reader',
            password: 'sterne123',
            email: 'reader@hm.edu',
            role,
        })
        reader.save()
    }
}

export { createUser, dropUser }
