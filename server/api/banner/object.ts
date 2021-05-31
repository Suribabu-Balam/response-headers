import { extendType, objectType } from '@nexus/schema'

export const CHALLAN_DETAIL_OBJ = objectType({
    name: 'Banner',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.title()
        t.model.version_user()
        t.model.version_no()
        t.model.version_date()
    },
})

export const banner_mutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.crud.createOneBanner()
    },
})

export const banner_query = extendType({
    type: 'Query',
    definition(t) {
        t.field('test_request', {
            type: 'JSON',
            resolve: async (_, args, ctx) => {
                return { status: 'success', name: 'alex', title: 'intro' }
            },
        })
        t.crud.banners()
    },
})
