import { TemplateController } from './template.controller'
import { pubsub } from '../app'

const EVENTS = {
    TEMPLATE: {
        // CREATED: 'TEMPLATE_CREATED',
        // UPDATED: 'TEMPLATE_UPDATED',
        // DELETED: 'TEMPLATE_DELETED',
    },
}

const templateResolver = {
    Query: {},
    Mutation: {},
    Subscription: {},
    Template: {},
}

export { templateResolver }
