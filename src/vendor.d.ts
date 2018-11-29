declare module '*.json' {
    const value: any
    export default value
}

declare namespace NodeJS {
    export interface Global {
        gConfig: any
        mongod: any
        db: any
    }
}
