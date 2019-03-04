import { Topic } from '../../api/topic/topic.model'

/**
 * drops all topics in the database.
 */
const dropTopics = async () => {
    await Topic.deleteMany({})
}

/**
 * creates the default topics in the database.
 */
const createTopics = async () => {
    let skiTopic
    let snowboardTopic

    skiTopic = await Topic.findOne({ name: 'ski' })
    if (!skiTopic) {
        skiTopic = new Topic({
            name: 'ski',
            description: 'ski',
        })
        skiTopic.save()
    }

    snowboardTopic = await Topic.findOne({ name: 'snowboard' })
    if (!snowboardTopic) {
        snowboardTopic = new Topic({
            name: 'snowboard',
            description: 'snowboard',
        })
        snowboardTopic.save()
    }
}

export { createTopics, dropTopics }
