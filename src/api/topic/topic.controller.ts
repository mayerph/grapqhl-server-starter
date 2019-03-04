import { Topic } from './topic.model'
import { Product } from '../product/product.model'

/**
 * Implements all logic related to a topic.
 */
const TopicController = {
    /**
     * returns all topics in the database.
     */
    topics: async () => {
        const topics = await Topic.find({})
        return topics
    },
    /**
     * returns a specific topic by id.
     * @param id - id of a topic
     */
    topic: async (id: string) => {
        const topic = await Topic.findById(id)
        return topic
    },
    /**
     * returns a specific topic by name.
     * @param name - name of the topic
     */
    topicByName: async (name: string) => {
        const topic = await Topic.findOne({ name })
        return topic
    },
    /**
     * creates a new topic.
     * @param name - name of the topic.
     * @param description - description of the topic
     */
    createTopic: async (name: string, description: string) => {
        const topic = new Topic({
            name,
            description,
        })

        await topic.save()

        return topic
    },
    /**
     * deletes topic by id.
     * @param id - id of topic
     */
    deleteTopic: async (id: string) => {
        await Topic.remove({ _id: id })
        return true
    },
    /**
     * updates existing topic.
     * @param id - id of the topic
     * @param name - name of the topic
     * @param description - description of the topic
     */
    updateTopic: async (id: string, name: string, description: string) => {
        const topic = await Topic.findById(id)
        if (name) {
            topic.name = name
        }
        if (description) {
            topic.description = description
        }
        await topic.save()
        return topic
    },
    /**
     * returns all products of a specific topic.
     * @param id - id of the topic
     */
    products: async (id: string) => {
        const products = await Product.find({ topics: id })
        return products
    },
}

export { TopicController }
