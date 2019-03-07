import mongoose from 'mongoose'

const Schema = mongoose.Schema
import { ITemplate, ITemplateModel } from './template.interface'

interface ITemplateMongoose extends ITemplate, mongoose.Document {}

interface ITemplateModelMongoose
    extends mongoose.Model<ITemplateMongoose>,
        ITemplateModel {}

const templateSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String },
})

const Template = mongoose.model<ITemplateMongoose, ITemplateModelMongoose>(
    'Template',
    templateSchema
)
export default Template
