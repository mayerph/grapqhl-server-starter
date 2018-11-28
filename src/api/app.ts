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
            if (connectionParams.authToken) {
                //if (true) {
                const userToken = connectionParams.authToken
                // const userToken =
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmZkNjQxYTU1YzdkYzFmY2ZjNzA5ZTMiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkL0ZmT2xEdS9oSm9UdXdrSG5vNTBrT0NWaFJRa0g4R0JMYVlSclo4RWguaWJnMU9QdXNac3kiLCJlbWFpbCI6ImFkbWluQGhtLmVkdSIsInJvbGUiOiI1YmZkMjFjNDhlMmIzNTUzNjY3M2IxMzUiLCJfX3YiOjAsImlhdCI6MTU0MzQxODg3NCwiZXhwIjoxNTQzNDIwNjc0fQ.VYapjYggC7WuKAaF6TyUfA8PBc2aI7jR3mp503uHHpA'
                return createContext(userToken)
            } else {
                throw new Error('Missing auth token!')
            }
        },
    },
    uploads: false,
})

export default apollo
