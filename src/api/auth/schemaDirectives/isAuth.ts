import { defaultFieldResolver } from 'graphql'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { UserController } from '../../user/user.controller'
import { AuthController } from '../auth.controller'

export class IsAuthDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = async (...args: any[]) => {
            args = await this.isAuth(args)
            return resolve.apply(this, args)
        }
    }

    protected async isAuth(args) {
        let user
        if (args[2].auth) {
            user = await this.getUser(args[2].auth.userToken)
        }

        if (!user) {
            throw new Error('not authenticated as users.')
        }

        return this.setSignedUser(args, user)
    }
    private async getUser(userToken: string) {
        if (userToken) {
            const user: any = await AuthController.verifyToken(userToken)
            return UserController.fullUser(user._id)
        }
    }

    private async setSignedUser(args, user) {
        args[2].auth.me = user
        return args
    }
}
