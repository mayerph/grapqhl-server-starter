import { IsAuthDirective } from './isAuth'
import { defaultFieldResolver } from 'graphql'

/**
 * SchemaDirectiveVisitor Subclass to initilize the resolver function
 * for the hasPermission Directive.
 */
export class HasPermissionDirective extends IsAuthDirective {
    /**
     * overwriting this methods allows to add the hasPermission directive
     * to a field in a graphql schema.
     * @param field - protected field
     */
    public visitFieldDefinition(field) {
        // reads the resolver function of the protected field
        const { resolve = defaultFieldResolver } = field

        // reads the the argument of the directive
        const { requiredPermission } = this.args

        // resolver function for the hasPermission Directive
        // checks if the user object has the required permissions
        field.resolve = async (...args: any[]) => {
            // checks if user is authenticated --> creates user object
            args = await this.isAuth(args)

            // reads the user object
            const [
                src,
                arg,
                {
                    auth: { me },
                },
                info,
            ] = args

            await this.hasPermission(me, requiredPermission)

            // runs the resolver function of the protected field
            return resolve.apply(this, args)
        }
    }
    /**
     * checks if the user object has the required permissions
     * @param me - user object with its permissions
     * @param requiredPermission - required permissions
     */
    public async hasPermission(me, requiredPermission: string) {
        const permissions = me.role.permissions.filter(
            e => e.name === requiredPermission
        )
        if (permissions.length === 0) {
            throw new Error('not authorized.')
        }
    }
}
