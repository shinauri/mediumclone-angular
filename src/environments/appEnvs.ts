export const appEnvs = {
    apiUrl: 'https://conduit.productionready.io/api',
    token: 'accessToken',
    limit: 10,
    routes: {
        auth: {
            login: 'login',
            register: 'register',
        },
        feeds: {
            global: '',
            your: 'feed',
            tag: 'tags/:slug',
        },
        articles: {
            article: 'articles/:slug',
            create: 'articles/new',
            edit: 'articles/:slug/edit',
        },
    },
    endpoints: {
        auth: {
            register: '/users',
            user: '/user',
            login: '/users/login',
        },
        feeds: {
            global: '/articles',
            your: '/articles/feed',
            tag: '/articles?tag=',
        },
        articles: {
            article: '/articles',
            articlePage: '/article',
        },
    },
}
