import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mockServer,
} from 'apollo-server'
import { gql, MockList } from 'apollo-server-express'
import { roleSchema } from '../../api/role/role.schema'
import { permissionSchema } from '../../api/permission/permission.schema'
import { graphql } from 'graphql'

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`

const typeDefs = [linkSchema].concat(roleSchema, permissionSchema)
const testCaseA = {
    id: 'Test case A',
    query: `
      query {
        permissions {
           name
        }
      }
    `,
    variables: {},
    context: {},
    expected: { data: { permissions: [{ name: 'Dog' }] } },
}

describe('Schema', () => {
    // Array of case types
    const cases = [testCaseA]
    const mockSchema = makeExecutableSchema({
        typeDefs,
    })
    const defaultMock = {
        Boolean: () => false,
        ID: () => '1',
        Int: () => 1,
        Float: () => 12.34,
        String: () => 'r2d2',
        Permission: () => {
            1
        },
    }
    // Here we specify the return payloads of mocked types
    addMockFunctionsToSchema({
        schema: mockSchema,
        mocks: defaultMock,
    })

    /*test('has valid type definitions', async () => {
        expect(async () => {
            const MockServer = mockServer(typeDefs, mocks)
            const query = `
                query {
                    permissions { 
                        id
                        name
                    }
                }
            `
            console.log(MockServer.query(query))
            /*graphql(mockSchema, query).then(result =>
                console.log('Got result', result)
            )*/
    /*console.log(
                await MockServer.query(`{
                permissons : { 
                    id
                    name
                }
            }`)
            )
        }).not.toThrow()
    })*/

    test('throws on missing name', async () => {
        console.log('test')
        const myMock = `Query: () => ({
            permissions: () => null,
        }),`
        const MockServer = mockServer(typeDefs, defaultMock)
        const query = `
                query {
                    roles { 
                        id
                        name
                        permissions {
                            name
                        }
                    }
                }
            `
        expect(async () => {
            //await graphql(mockSchema, query)
            await MockServer.query(query)
        }).toThrow()
    })

    test('throws on missing name', async () => {
        const myMock = `Query: () => ({
            permissions: () => null,
        }),`
        const MockServer = mockServer(typeDefs, defaultMock)
        const query = `
                query {
                    roles { 
                        id
                        name
                        permissions {
                            name
                        }
                    }
                }
            `
        return await expect(graphql(mockSchema, query)).resolves.toEqual(
            testCaseA.expected
        )
    })

    /*cases.forEach(obj => {
        const { id, query, variables, context: ctx, expected } = obj

        test(`query: ${id}`, async () => {
            return await expect(
                graphql(mockSchema, query).then((result) => console.log('Got result', result))
        })
    })*/
})
