import { IsAuthDirective } from './isAuth'
import { defaultFieldResolver } from 'graphql'
import { UserController } from '../../user/user.controller'

/**
 * SchemaDirectiveVisitor Subclass to initilize the resolver function
 * for the messageOwner Directive.
 */
export class MessageOwnerDirective extends IsAuthDirective {
    /**
     * overwriting this methods allows to add the hasPermission directive
     * to a field in a graphql schema.
     * @param field - protected field
     */
    public visitFieldDefinition(field) {
        // reads the resolver function of the protected field
        const { resolve = defaultFieldResolver } = field

        // resolver function for the messageOwner Directive.
        // checks if user is owner of an object
        field.resolve = async (...args: any[]) => {
            args = await this.isAuth(args)

            // reads id of an object and the initiating user object
            const [
                src,
                { id },
                {
                    auth: { me },
                },
                info,
            ] = args
            // reads user object that is owner of an specific object
            const user = await UserController.messageOwner(id, me._id)

            await this.isMessageOwner(user)
            return resolve.apply(this, args)
        }
    }
    /**
     * checks if the initiating user is the owner of the object.
     * @param user - user object
     */
    public async isMessageOwner(user) {
        if (!user) {
            throw new Error(
                'You are not allowed to delete this message. Only the Owner is authorized'
            )
        }
    }
}
