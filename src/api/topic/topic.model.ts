import mongoose from 'mongoose'
import { ITopic, ITopicModel } from './topic.interface'

const Schema = mongoose.Schema

/**
 * interface of the mongoose-schema
 * can be used to define properties and non-static methods
 */
interface ITopicMongoose extends ITopic, mongoose.Document {}

/**
 * interface of the mongoose-model
 * can be used defining static methods
 */
interface ITopicModelMongoose
    extends mongoose.Model<ITopicMongoose>,
        ITopicModel {}

/**
 * mongoose-schema of a topic
 */
const topicSchema = new Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    description: { type: String },
})

/**
 * mongoose-model of a topic
 */
const Topic = mongoose.model<ITopicMongoose, ITopicModelMongoose>(
    'Topic',
    topicSchema
)
export { Topic }
