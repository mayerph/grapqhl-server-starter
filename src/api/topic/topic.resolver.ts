import { Topic } from './topic.model'
import { TopicController } from './topic.controller'

/**
 * Implementation of the GraphQL-Schema of the topic
 * every resolver-functions calls a controller-function, which contains the specific logic
 */
const topicResolver = {
    Query: {
        /**
         * returns all topics in the database.
         */
        topics: async (parent, args, context) => {
            const topics = await TopicController.topics()
            return topics
        },
        /**
         * returns a specific topic by id.
         */
        topic: async (parent, { id }, { models }) => {
            const topic = await TopicController.topic(id)
            return topic
        },
    },

    Mutation: {
        /**
         * creates a new topic.
         */
        createTopic: async (parent, { name, description }, context) => {
            const topic = await TopicController.createTopic(name, description)
            return topic
        },
        /**
         * deletes a specific topic.
         */
        deleteTopic: async (parent, { id }, { models }) => {
            const successful = await TopicController.deleteTopic(id)
            return successful
        },
        /**
         * updates an existing topic.
         */
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
        /**
         * returns all products of a topic
         */
        products: async (topic, args, context) => {
            const products = await TopicController.products(topic.id)
            return products
        },
    },
}

export { topicResolver }
