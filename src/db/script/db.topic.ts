import { Topic } from '../../api/topic/topic.model'

/**
 * drops all topics in the database.
 */
const dropTopics = async () => {
    await Topic.deleteMany({}).exec()
}

/**
 * creates the default topics in the database.
 */
const createTopics = async () => {
    let skiTopic
    let snowboardTopic

    skiTopic = await Topic.findOne({ name: 'ski' }).exec()
    if (!skiTopic) {
        skiTopic = new Topic({
            name: 'ski',
            description: 'ski',
        })
        skiTopic.save()
    }

    snowboardTopic = await Topic.findOne({ name: 'snowboard' }).exec()
    if (!snowboardTopic) {
        snowboardTopic = new Topic({
            name: 'snowboard',
            description: 'snowboard',
        })
        snowboardTopic.save()
    }
}

export { createTopics, dropTopics }
