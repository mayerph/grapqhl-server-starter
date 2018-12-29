import { ApolloServer, PubSub } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

// graphql schema & resolvers
import typeDefs from './schema'
import resolvers from './resolvers'
import schemaDirectives from './schemaDirectives'

// subscription
export const pubsub = new PubSub()

// GraphQL
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives,
})

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

const apollo = new ApolloServer({
    schema,
    context: async ({ req, connection }) => {
        // token
        if (connection) {
            return connection.context
        }

        const userToken = req.headers.authentication
        return createContext(userToken)
    },
    subscriptions: {
        onConnect: async (connectionParams: any, webSocket, context) => {
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
