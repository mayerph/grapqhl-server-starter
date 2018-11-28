import mongoose from 'mongoose'
import { ITopic, ITopicModel } from './topic.interface'

const Schema = mongoose.Schema

interface ITopicMongoose extends ITopic, mongoose.Document {}

interface ITopicModelMongoose
    extends mongoose.Model<ITopicMongoose>,
        ITopicModel {}

const topicSchema = new Schema({
    name: { type: String, unique: true, required: true, dropDups: true },
    description: { type: String },
})

const Topic = mongoose.model<ITopicMongoose, ITopicModelMongoose>(
    'Topic',
    topicSchema
)
export { Topic }
