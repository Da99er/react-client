/* eslint-disable consistent-return */

const httpXHR = ({ method = 'GET', url, headers = {}, body }) => new Promise((resolve, reject) => {

    if (window.IS_SERVER) {

        return resolve(null);

    }

    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    Object.keys(headers).forEach((headField) => {

        xhr.setRequestHeader(headField, headers[headField]);

    });

    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {

        if (this.readyState !== 4) return;

        if (!/^(2|3)[0-9][0-9]$/.test(this.status)) {

            return reject({
                status: this.status,
                statusText: this.statusText,
                responseURL: this.responseURL,
            });

        }

        let ans;

        try {

            ans = JSON.parse(this.responseText);

        } catch (err) {

            ans = this.responseText;

        }

        if (ans.error) {

            return reject(ans.error);

        }

        return resolve(ans);

    };

    if (method === 'GET') {

        return xhr.send();

    }

    return xhr.send(body);

});

export default httpXHR;
