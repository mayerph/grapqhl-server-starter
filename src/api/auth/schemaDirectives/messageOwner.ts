import { IsAuthDirective } from './isAuth'
import { defaultFieldResolver } from 'graphql'
import { UserController } from '../../user/user.controller'

export class MessageOwnerDirective extends IsAuthDirective {
    public visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = async (...args: any[]) => {
            // 1. prüfen ob User angemeldet ist --> setzte angemeldeten user
            args = await this.isAuth(args)

            // 2. Ist der User der Urheber der Nachricht
            const [
                src,
                { id },
                {
                    auth: { me },
                },
                info,
            ] = args
            const user = await UserController.messageOwner(id, me._id)
            await this.isMessageOwner(user)
            return resolve.apply(this, args)
        }
    }
    public async isMessageOwner(user) {
        if (!user) {
            throw new Error(
                'You are not allowed to delete this message. Only the Owner is authorized'
            )
        }
    }
}
