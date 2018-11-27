import User from '../../api/user/user.model'
import { Role } from '../../api/role/role.model'

const dropUser = async () => {
    await User.deleteMany({})
}

const createUser = async () => {
    let admin
    let reader

    admin = await User.findOne({ username: 'admin' })
    if (!admin) {
        const role = await Role.findOne({ name: 'ADMIN' })
        admin = new User({
            username: 'admin',
            password: 'sterne123',
            email: 'admin@hm.edu',
            role,
        })
        admin.save()
    }

    reader = await User.findOne({ username: 'reader' })

    if (!reader) {
        const role = await Role.findOne({ name: 'READER' })
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
