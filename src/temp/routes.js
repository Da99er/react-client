import { stringify } from '@root/utils/prepareQuery';

const routes = [{
    path: '/color/:color',
    component: 'Color',
    preloadDataQuery: stringify({
        'someColor': {
            color: "255111"
        }
    })
}, {
    path: "/:anything*",
    component: 'NotFound',
    preloadDataQuery: stringify({
        'someColor': {
            color: "000000"
        }
    })
}];

export default routes;
