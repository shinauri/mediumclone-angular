export const appEnvs = {
    apiUrl: 'https://conduit.productionready.io/api',
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
        },
    },
    token: 'accessToken',
    limit: 10,
}
