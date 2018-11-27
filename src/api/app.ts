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
                const userToken = connectionParams.authToken
                // const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUkVBREVSIiwibWVzc2FnZXMiOlsiNWJlYWY4NGQ1NTJjNzI3MDhjYjhmZjQyIiwiNWJlYWY4OTBlNGE2NGM3MGM2NGFmZTI1IiwiNWJlYWZhNjM5MDU0MDY3MTlmZWEzNDhkIiwiNWJlYWZhOTVhNWIzYTg3MWI5NTRmNjdmIiwiNWJlYWZhYjJmZWY0ZDg3MWNjMmQ2NjliIiwiNWJlYWZiNzU0YjQ3YWU3MjIzMmJjYTdkIiwiNWJlYWZjMGU0YjQ3YWU3MjIzMmJjYTgyIiwiNWJlYmViZDkxMDQyMGU5MjA3ZWUyNTJlIiwiNWJlYmVjZDZiNGM4ZWQ5MjdlMjA3ZjRmIiwiNWJlZDcyNGI5YjUwYmMxODFmMzA1YWVhIiwiNWJlZDcyNGM5YjUwYmMxODFmMzA1YWViIiwiNWJlZDcyNGM5YjUwYmMxODFmMzA1YWVjIiwiNWJlZDcyNGQ5YjUwYmMxODFmMzA1YWVkIiwiNWJlZDcyNGQ5YjUwYmMxODFmMzA1YWVlIl0sIl9pZCI6IjViZWFmODNhNTUyYzcyNzA4Y2I4ZmY0MSIsInVzZXJuYW1lIjoidmFkZXIiLCJlbWFpbCI6InZhZGVyQGhtLmVkdSIsInBhc3N3b3JkIjoiJDJiJDEwJC5NTy9USFdCc0dHYVk4eGtQS2lwMGVBajAwOUxCT0VlejR0TXBDLlpjU1RoMXFwSGdDYnRHIiwiX192IjoxNCwiaWF0IjoxNTQyODc0NDg3LCJleHAiOjE1NDI4NzYyODd9.qIgHjGVrypGi5swEtwgein92Xu8MFcddeQAHBpah51c"
                return createContext(userToken)
            } else {
                throw new Error('Missing auth token!')
            }
        },
    },
    uploads: false,
})

export default apollo
