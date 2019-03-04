import { ApolloServer, PubSub } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

// import of the graphql-schema & -resolvers
import typeDefs from './schema'
import resolvers from './resolvers'
import schemaDirectives from './schemaDirectives'

// object that manages all subscriptions
export const pubsub = new PubSub()

// creates the final graphql schema with all it's resolver and schema directive implementations
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
})

// creates the context of the apollo server
const createContext = (token: string) => {
    return {
        token: {
            secret: process.env.SECRET,
            expiresIn: process.env.TOKEN_VALID_TIME,
        },
        auth: {
            userToken: token,
            me: null,
        },
    }
}

// creates the apollo server with the schema
const apollo = new ApolloServer({
    schema,
    context: async ({ req, connection }) => {
        // if it is a web-socket connection (subscription)
        if (connection) {
            return connection.context
        }
        // reads the json-web-token from the http header
        const userToken = req.headers.authentication
        return createContext(userToken)
    },
    subscriptions: {
        onConnect: async (connectionParams: any) => {
            // reads the json-web-token from the web-socket connection
            if (connectionParams.authentication) {
                const userToken = connectionParams.authToken
                return createContext(userToken)
            } else {
                throw new Error('Missing auth token!')
            }
        },
    },
    uploads: false,
})

export default apollo
