# grapqhl-server-starter

# Pre-requirements

To build and run this app locally you will need a few things:

-   Install [Node.js](https://nodejs.org/en/)
-   Install [MongoDB](https://docs.mongodb.com/manual/installation/)
-   Install [VS Code](https://code.visualstudio.com/)

# Getting started

-   Clone the repository

```
git clone https://github.com/mayerph/grapqhl-server-starter.git
```

-   Install dependencies

```
cd <project_name>
npm install
```

-   Start your mongoDB server

```
mongod
```

-   Build and run the project

```
npm run build
npm start
```

# Developing

- Start your mongoDB server

```
mongod
```

- Recompile on save
```
npm run watch-ts
```

- Restart node on save
```
npm run watch-node
```

# Project
## General structure
| Name | Description |
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|
| **.vscode**                                    | contains VSC settings                                                                           |
| **coverage**                                   | contains reports about the code coverage of the last test run                                   |
| **dist**                                       | contains the plain javaScript files created by the TypeScript build                             |
| **node_modules**                               | contains all npm dependencies                                                                   |
| **public**                                     | public directory where the files for the client-side are stored                                 |
| **public/images**                              | public directory where the images are stored                                                   |
| **public/images/product**                      | public directory where the product images are stored                                           |
| **public/images/user**                         | public directory where the user images are stored                                               |
| **src**                                        | contains the source code that will be compiled to the dist directory                           |
| **src/api**                                    | contains all operations which can be accessed through the api                                   |
| **src/api/\<feature>**                         | contains all operations related to a feature-based directory                                   |
| **src/api/app.ts**                             | apollo server configuration. Entry point to the api                                             |
| **src/api/resolvers.ts**                       | merges all feature-based graphql-resolvers                                                     |
| **src/api/schema.ts**                          | merges all feature-based graphql-schema-entries                                                 |
| **src/api/schemaDirectives.ts**                | merges all implementations for feature-based graphq-schema-directives                           |
| **src/config**                                 | contains the configuration of the application                                                   |
| **src/db**                                     | contains the configuration of the database                                                     |
| **src/db/script**                              | contains the files that create the default database entries                                     |
| **src/db/db.config.ts**                        | manages the creation and deletion of the default database entries                               |
| **src/db/index.ts**                            | connect, disconnect and drop connection to a database                                           |
| **src/test**                                   | contains the unit-, e2e- and integration-tests                                                 |
| **src/server.ts**                              | creates and starts the http-server with express                                                 |
| **src/vendor.d.ts**                            | defines global variables                                                                       |


## Feature-based structure
| Name | Description |
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|
| **src/api/\<feature>/schema**                  | contains all graphql-schema-entries for the feature-based directory                             |
| **src/api/\<feature>/schemaDirectives**        | contains the implementations of the graphql-schema-directives for the feature-based directory |
| **src/api/\<feature>/\<feature>.controller.ts**| controllers implement the functions called by the resolvers                                     |
| **src/api/\<feature>/\<feature>.interface.ts** | interface for the model, so the database layer can be switched                                 |
| **src/api/\<feature>/\<feature>.model.ts**     | models define Mongoose schemas that will be used in storing and retrieving data from MongoDB   |
| **src/api/\<feature>/\<feature>.resolver.ts**  | resolvers represent the implementation of the graphql-schema.                                   |
| **src/api/\<feature>/\<feature>.schema.ts**    | merges the graphql schema entries for the feature-based directory                               |
| **src/api/\<feature>/\<feature>.schemaDirectives.ts**    | merges the graphql schema entries for the feature-based directory                     |

## Naming
### Definitions
- feature = combines complementary implementations
e.g. User (combines the interface, model, schema, resolver, ... of a User)

- rule = a certain kind of implementation
e.g. interface

### Convention

- files in feature-based directories

```
<feature>.<role>.ts
```
