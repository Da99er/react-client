const replaceMaskToLocation = (preloadDataQuery = '', params) => {

    const queryObj = JSON.parse(decodeURIComponent(preloadDataQuery));

    Object.keys(queryObj).forEach((loader) => {

        if (queryObj[loader] && queryObj[loader].mask) {

            queryObj[loader] = params;

        }

    });

    return queryObj;

};

export default replaceMaskToLocation;
