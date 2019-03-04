import { userType, userQuery, userMutation, userSubscription } from './schema'

/**
 * merges all graphql schema entries of the user
 */
const userSchema = [userType, userQuery, userMutation, userSubscription]

export { userSchema }
