# graphql-server-starter

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

- Test your GraphQL Queries with [apollo playground](http://localhost:8000/graphql)

![apollo_playground_1](../assets/apollo_playground_1.png?raw=true)

- Adding a new feature. [click here](https://github.com/mayerph/grapqhl-server-starter/blob/master/README.md#adding-a-new-feature)


# Project
## Default Application Data
| User | Password | Description
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| admin                                   | sterne123     | the user is assigned to all permissions
| reader                                   | sterne123     | the user has only read permissions

## Operations
There are some operations, which need admin permissions. Therefore you have to signIn with the admin user and copy the the responded JSON Web Token in the http headers section.

- Sign in
![apollo_playground_2](../assets/apollo_playground_2.png?raw=true)

- Executing an operation which requires admin permissions
![apollo_playground_3](../assets/apollo_playground_3.png?raw=true)

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
| **template**                                   | contains the template files for adding a new feature. This directory is used by the feature-add shell script                                                                      |
| **.dockerignore**                              | excludes files and directories from the docker build                                                                       |
| **.env**                                       | defines the private key for creating a json web token                                                                      |
| **.gitignore**                                 | specifies intentionally untracked files to ignore                                                                     |
| **.prettierrc**                                | prettier is an opinionated code formatter. This file contains the config therefor                                                                      |
| **docker-build-and-push**                      | shell script that manages the the docker build and the push to the docker repository                                                                      |

## Feature-based structure
### Naming
#### Definitions
- feature = combines complementary implementations
e.g. User (combines the interface, model, schema, resolver, ... of a User)

- role = a certain kind of implementation
e.g. interface

- features-based directory = organizes all roles related to a feature. In this project all feature-based directories are located in the src/api directory

#### Convention

- files in feature-based directories

```
<feature>.<role>.ts
```

For a full example have a look at following directory:
src/api/User/

### Sample project structure
All feature-based directories are located in the src/api/ directory. 
In this project, it consists of following files and subdirectories:

| Name | Description |
| ---------------------------------------------- | -----------------------------------------------------------------------------------------------|
| **src/api/\<feature>/schema**                  | contains all graphql-schema-entries for the feature-based directory. Foreach type (e.g. query) you have to create a separate file                           |
| **src/api/\<feature>/schemaDirectives**        | contains the implementations of the graphql-schema-directives for the feature-based directory |
| **src/api/\<feature>/\<feature>.controller.ts**| controllers implement the functions called by the resolvers                                     |
| **src/api/\<feature>/\<feature>.interface.ts** | interface for the model, so the database layer can be switched                                 |
| **src/api/\<feature>/\<feature>.model.ts**     | models define Mongoose schemas that will be used in storing and retrieving data from MongoDB   |
| **src/api/\<feature>/\<feature>.resolver.ts**  | resolvers represent the implementation of the graphql-schema.                                   |
| **src/api/\<feature>/\<feature>.schema.ts**    | merges the graphql schema entries for the feature-based directory                               |
| **src/api/\<feature>/\<feature>.schemaDirectives.ts**    | merges the graphql schema entries for the feature-based directory                     |


### Adding a new feature
For adding a new feature you have to create a new feature-based directory in the src/api/ directory including all files and directories equal to the sample project structure. You can do this by using the shell script (feature-add) or manually.

#### script-based
##### 1. run the script
```
npm run feature <name of the feature>
```

##### 2. add the graphql schema of the new feature to the schema.ts file
```javascript
import { <feature>Resolver } from './<feature>'
// e.g. import { userResolver } from './user'

const resolvers = [
  <feature>Resolver
  // e.g userResolver
]

```

##### 3. add the graphql resolvers of the new feature to the resolver.ts file
```javascript
import { <feature>Schema } from './<feature>'
// e.g. import { userSchema } from './user'

const schemas = [linkSchema].concat(
  <feature>Schema
  // e.g userSchema
)

```

#### manually
create the files manually equal to the table above and execute step 2 and 3 of the script-based approach


