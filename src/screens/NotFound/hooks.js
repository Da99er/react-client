import { useSelector } from 'react-redux';

import { getColor } from '@root/redux/someColor/selectors';

export default () => ({
    color: useSelector((state) => getColor(state)),
});
