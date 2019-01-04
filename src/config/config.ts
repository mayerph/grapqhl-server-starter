import { merge } from 'lodash'

const config = {
    development: {
        id: 'development',
        app_name: 'graphql-server-starter',
        app_desc: 'graphql-server-starter',
        server: '127.0.0.1',
        protocol: 'http',
        server_port: 8000,
        database: {
            host: 'localhost',
            port: 27017,
            db: 'skiLeasing',
            config: true,
            drop: false,
        },
        api: {
            endpoint: '/graphql',
            upload: {
                maxFileSize: 10000000,
                maxFiles: 10,
            },
        },
    },
    testing: {
        id: 'testing',
        database: {
            host: 'mongo',
            port: 27017,
            db: 'skiLeasing',
            config: true,
            drop: false,
        },
    },
    staging: {
        id: 'staging',
    },
    production: {
        id: 'production',
    },
}

const defaultConfig = config.development
const environment = process.env.NODE_ENV || 'development'
const environmentConfig = config[environment]
const finalConfig = merge(defaultConfig, environmentConfig)

export { finalConfig }
