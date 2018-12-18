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
                //if (true) {
                const userToken = connectionParams.authToken
                //const userToken =
                //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmZkNjQxYTU1YzdkYzFmY2ZjNzA5ZTMiLCJ1c2VybmFtZSI6ImFkbWlubiIsInBhc3N3b3JkIjoiJDJiJDEwJC9GZk9sRHUvaEpvVHV3a0hubzUwa09DVmhSUWtIOEdCTGFZUnJaOEVoLmliZzFPUHVzWnN5IiwiZW1haWwiOiJhZG1pbkBobS5lZHUiLCJyb2xlIjoiNWJmZDIxYzQ4ZTJiMzU1MzY2NzNiMTM1IiwiX192IjowLCJpbWciOiI1YzBlYzZhOTRhMTM4M2Q3YzI1NzA1NjAiLCJpYXQiOjE1NDQ1NTIwNDMsImV4cCI6MTU0NDU1Mzg0M30.w20IityB7v00JMDm-Q1rBKL5XEefPOfHIBvEF3A3Lh4'
                return createContext(userToken)
            } else {
                throw new Error('Missing auth token!')
            }
        },
    },
    uploads: false,
})

export default apollo
