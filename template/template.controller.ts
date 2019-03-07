import Template from './template.model'

const TemplateController = {
    templates: async () => {
        const templates = await Template.find({})
        return templates
    },
    createTemplate: async (name: string, description: string) => {
        const template = new Template({ name, description })
        await template.save()
        return template
    },
}

export { TemplateController }
