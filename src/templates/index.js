const { join } = require('path');

const { PATH_TO_PUBLIC } = require(join(__dirname, '..', 'globals', 'path-to'));

const getFile = (file) => join(PATH_TO_PUBLIC, global.MY1_GLOBAL.RELOAD_FILES_STORAGE[file] || '');

exports.START = () => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
<link rel="shortcut icon" type="image/gif" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" >
<link rel="preload" href="${getFile('client.js')}" as="script">
<link rel="preload" href="${getFile('client.css')}" as="style">
<link rel="stylesheet" href="${getFile('client.css')}" />
<title>Page</title>
</head>
<body >
<div id="root">`;

exports.END = (preloadDataQuery) => `</div>
<div id="preloadDataQuery" hidden="true">${preloadDataQuery}</div>
<script type="text/javascript" src="${getFile('client.js')}"></script>
</body></html>`;
