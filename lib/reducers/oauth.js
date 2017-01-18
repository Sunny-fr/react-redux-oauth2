'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
var defaultState = exports.defaultState = {
    authenticating: false,
    user: null,
    error: null,
    token: null
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case 'OAUTH_START':
            return _extends({}, state, { authenticating: true, user: null, error: null });
            break;
        case 'OAUTH_CANCELED':
            return _extends({}, state, { authenticating: false, user: null, error: 'user canceled' });
        case 'OAUTH_ERROR':
            return _extends({}, state, { authenticating: false, user: null, error: action.payload });
            break;
        case 'OAUTH_LOAD_USER':
            return _extends({}, state, {
                authenticating: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            });
            break;
        case 'OAUTH_LOAD_TOKEN':
            return _extends({}, state, { authenticating: false, token: action.payload.token, error: null });
            break;
        case 'OAUTH_SAVE_TOKEN':
            return _extends({}, state, { authenticating: false, token: action.payload, error: null });
            break;
        case 'OAUTH_SIGNOUT':
            return _extends({}, state, { authenticating: false, user: null, token: null, error: null });
            break;
        default:
            return state;
    }
}