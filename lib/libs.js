'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetch_token = fetch_token;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetch_token(token) {
    return _axios2.default.get('' + config.url + config.token + '?client=' + config.clientID, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
}