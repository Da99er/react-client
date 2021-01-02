import { useSelector } from 'react-redux';

import {
    getLoadingStatus,
} from '@root/redux/gui/selectors';

export default () => ({
    loadingStatus: useSelector(getLoadingStatus),
});
