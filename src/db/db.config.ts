import {
    createUser,
    dropUser,
    createPermissions,
    dropPermissions,
    createRoles,
    dropRoles,
} from './script'

const dbConfig = async drop => {
    if (drop) {
        await dropUser()
        await dropRoles()
        await dropPermissions()
    }

    await createPermissions()
    await createRoles()
    await createUser()
}

export { dbConfig }
