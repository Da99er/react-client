import { useSelector } from 'react-redux';

import { getText } from '@root/redux/testText/selectors';

export default () => ({
    text: useSelector((state) => getText(state)),
});
