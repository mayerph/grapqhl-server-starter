import { TemplateController } from './template.controller'
import { pubsub } from '../app'

const EVENTS = {
    TEMPLATE: {
        CREATED: 'TEMPLATE_CREATED',
        // UPDATED: 'TEMPLATE_UPDATED',
        // DELETED: 'TEMPLATE_DELETED',
    },
}

const templateResolver = {
    Query: {
        templates: async (parent, args, context) => {
            const templates = await TemplateController.templates()
            return templates
        },
    },
    Mutation: {
        createTemplate: async (parent, { name, description }) => {
            const template = await TemplateController.createTemplate(
                name,
                description
            )

            await pubsub.publish(EVENTS.TEMPLATE.CREATED, {
                templateCreated: template,
            })

            return template
        },
    },
    Subscription: {
        templateCreated: {
            subscribe: () => pubsub.asyncIterator([EVENTS.TEMPLATE.CREATED]),
        },
    },
    //Template: {},
}

export { templateResolver }
