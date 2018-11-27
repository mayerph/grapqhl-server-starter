import { IsAuthDirective } from './isAuth'
import { defaultFieldResolver } from 'graphql'

export class HasPermissionDirective extends IsAuthDirective {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field
        const { requiredPermission } = this.args

        field.resolve = async (...args: any[]) => {
            // 1. prüfen ob User angemeldet ist --> setzte angemeldeten user
            args = await this.isAuth(args)

            // 2. Haat User die entsprechende Rolle
            const [
                src,
                arg,
                {
                    auth: { me },
                },
                info,
            ] = args
            await this.hasPermission(me, requiredPermission)

            return resolve.apply(this, args)
        }
    }

    public async hasPermission(me, requiredPermission: string) {
        const permissions = me.role.permissions.filter(
            e => e.name === requiredPermission
        )
        if (permissions.length === 0) {
            throw new Error('not authorized.')
        }
    }
}
