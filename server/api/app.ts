import { ApolloServer } from 'apollo-server-express'
import { PrismaClient } from '@prisma/client'
import express from 'express'
import { schema } from './schema'

const sanitiser = (req: any, res: any, next: any): void => {
    res.removeHeader('Transfer-Encoding')
    res.removeHeader('X-Powered-By')

    next()
}

export const makeContext = (params: any): any => {
    params.res.setHeader('x-server-date', new Date().toISOString())
    params.res.setHeader('x-refresh-token', 'this is sample refresh token')
}

export const init = async () => {
    const prisma = new PrismaClient()

    const apollo = new ApolloServer({
        context: (ctx) => ({
            ...ctx,
            db: prisma,
            prisma,
            ...makeContext(ctx),
        }),
        schema: schema,
        playground: true,
    })

    const app = express()
    app.use(sanitiser)
    apollo.applyMiddleware({ app, bodyParserConfig: { limit: '10mb' } })
    app.listen(4000, () => {
        console.log('🚀 GraphQL service ready at http://localhost:4000/graphql')
    })
}

init()
