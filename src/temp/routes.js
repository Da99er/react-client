import { stringify } from '@root/utils/prepareQuery';

const routes = [{
    path: '/testpath/:test([a-z]{4})',
    component: 'TestText',
    preloadDataQuery: stringify({
        'testText': {
            text: "some text"
        }
    })
}, {
    path: "*",
    component: 'NotFound',
    preloadDataQuery: stringify({
        'testText': {
            text: "not found text"
        }
    })
}];

export default routes;
