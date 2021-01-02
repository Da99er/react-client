import { useCallback } from 'react';
import { batch, useDispatch } from 'react-redux';

import prefixCreator from '@root/redux/utils/prefixCreator';
import { switchLoadingStatus } from '@root/redux/gui/actions';

function useUpdateStore() {

    const dispatch = useDispatch();

    function updateProperty(propertyPair) {

        const [key, value] = propertyPair;

        dispatch({
            type: `${prefixCreator(key)}UPLOADED`,
            payload: value,
        });

        if (value && value.error) {

            setTimeout(() => {

                throw new Error(`${key}: ${value.error}`);

            }, 10);

        }

    }

    const updateStoreHandle = useCallback((loaderProperties) => {

        // name of action must be like "redux/SOMECOLOR/UPLOADED"

        batch(() => {

            Object.entries(loaderProperties).forEach(updateProperty);

        });

        dispatch(switchLoadingStatus(false));

    });

    return updateStoreHandle;

}

export default useUpdateStore;
