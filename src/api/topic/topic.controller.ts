import { Topic } from './topic.model'
import { Product } from '../product/product.model'

const TopicController = {
    topics: async () => {
        const topics = await Topic.find({})
        return topics
    },
    topic: async (id: string) => {
        const topic = await Topic.findById(id)
        return topic
    },
    topicByName: async (name: string) => {
        const topic = await Topic.findOne({ name })
        return topic
    },
    createTopic: async (name: string, description: string) => {
        const topic = new Topic({
            name,
            description,
        })

        await topic.save()

        return topic
    },
    deleteTopic: async (id: string) => {
        await Topic.remove({ _id: id })
        return true
    },
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
    products: async (id: string) => {
        const products = await Product.find({ topics: id })
        return products
    },
}

export { TopicController }
