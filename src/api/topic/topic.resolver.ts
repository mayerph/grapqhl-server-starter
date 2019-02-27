import { Topic } from './topic.model'
import { TopicController } from './topic.controller'

/**
 * Implementation of the GraphQL-Schema of the topic
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const topicResolver = {
    Query: {
        topics: async (parent, args, context) => {
            const topics = await TopicController.topics()
            return topics
        },
        topic: async (parent, { id }, { models }) => {
            const topic = await TopicController.topic(id)
            return topic
        },
    },

    Mutation: {
        createTopic: async (parent, { name, description }, context) => {
            const topic = await TopicController.createTopic(name, description)
            return topic
        },

        deleteTopic: async (parent, { id }, { models }) => {
            const successful = await TopicController.deleteTopic(id)
            return successful
        },
        updateTopic: async (parent, { id, name, description }, { models }) => {
            const topic = await TopicController.updateTopic(
                id,
                name,
                description
            )
            return topic
        },
    },
    Topic: {
        products: async (topic, args, context) => {
            const products = await TopicController.products(topic.id)
            return products
        },
    },
}

export { topicResolver }
