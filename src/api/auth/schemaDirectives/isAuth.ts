import { defaultFieldResolver } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { UserController } from '../../user/user.controller'
import { AuthController } from '../auth.controller'

/**
 * SchemaDirectiveVisitor Subclass to initilize the resolver function
 * for the isAuth Directive.
 */
export class IsAuthDirective extends SchemaDirectiveVisitor {
    /**
     * overwriting this methods allows to add the isAuth directive
     * to a field in a graphql schema.
     * @param field - protected field
     */
    public visitFieldDefinition(field) {
        // reads the resolver function of the protected field.
        const { resolve = defaultFieldResolver } = field

        // resolver function for the isAuth Directive.
        // checks if user is authenticated --> creates user object
        field.resolve = async (...args: any[]) => {
            args = await this.isAuth(args)
            return resolve.apply(this, args)
        }
    }
    /**
     * checks if user is authenticated --> creates user object.
     * @param args - arguments of the field resolver function.
     */
    protected async isAuth(args) {
        let user
        // checks if the context property is set.
        if (args[2].auth) {
            user = await this.getUser(args[2].auth.userToken)
        }

        // checks if the token has been decoded to user object.
        if (!user) {
            throw new Error('not authenticated as users.')
        }

        const newArgs = await this.setSignedUser(args, user)
        return newArgs
    }

    /**
     * checks the validity of the token --> returns user object.
     * @param userToken - JSON Web Token to be decoded.
     */
    private async getUser(userToken: string) {
        if (userToken) {
            const user: any = await AuthController.verifyToken(userToken)
            const fullUser = await UserController.fullUser(user._id)
            return fullUser
        }
    }

    /**
     * sets the user object in the context property.
     * @param args - arguments of the field resolver function, which contain the context property.
     * @param user - user object that will be set in the context property.
     */
    private async setSignedUser(args, user) {
        args[2].auth.me = user
        return args
    }
}
