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

        const newArgs = await this.setSignedUser(args, user)
        return newArgs
    }
    private async getUser(userToken: string) {
        if (userToken) {
            const user: any = await AuthController.verifyToken(userToken)
            const fullUser = await UserController.fullUser(user._id)
            return fullUser
        }
    }

    private async setSignedUser(args, user) {
        args[2].auth.me = user
        return args
    }
}
