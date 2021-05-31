import * as path from 'path'
import { makeSchema, asNexusMethod, fieldAuthorizePlugin } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { DateTimeResolver, JSONResolver } from 'graphql-scalars'
import * as types from './types'
import { GraphQLUpload } from 'apollo-server-express'

const jsonScalar = asNexusMethod(JSONResolver, 'json')
const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
    types: [types, jsonScalar, dateTimeScalar, GraphQLUpload],
    shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
    plugins: [
        nexusPrisma({
            experimentalCRUD: true,
            scalars: {
                DateTime: DateTimeResolver,
            },
            paginationStrategy: 'prisma',
            outputs: {
                typegen: path.join(__dirname, '../node_modules/@types/typegen-nexus-plugin-prisma/index.d.ts'),
            },
        }),
        fieldAuthorizePlugin(),
    ],

    outputs: {
        typegen: path.join(__dirname, '../node_modules/@types/nexus-typegen/index.d.ts'),
        schema: path.join(__dirname, './api.graphql'),
    },
})
