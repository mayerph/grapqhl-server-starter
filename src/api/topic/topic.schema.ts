import { topicType, topicQuery, topicMutation } from './schema'

/**
 * merges all graphql schema entries of the topic
 */
const topicSchema = [topicType, topicQuery, topicMutation]

export { topicSchema }
