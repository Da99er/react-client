const pathJoin = (...arg) => {

    const separator = '/';
    const parts = arg.map((part = '', index) => {

        let newPart = '';

        if (index) {

            newPart = part.replace(new RegExp(`^${separator}`), '');

        }
        if (index !== arg.length - 1) {

            newPart = part.replace(new RegExp(`${separator}$`), '');

        }
        return newPart;

    });

    return parts.join(separator);

};

export default pathJoin;
