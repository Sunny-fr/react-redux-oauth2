'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cancel = cancel;
exports.error = error;
exports.start = start;
exports.load_user = load_user;
exports.load_token = load_token;
exports.complete = complete;
exports.save_token = save_token;
exports.signout = signout;
exports.sync_user = sync_user;

var _reactCookie = require('react-cookie');

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _libs = require('../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cancel() {
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_CANCELED'
        });
    };
}

function error(error) {
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_ERROR',
            payload: error
        });
    };
}

function start() {
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_START'
        });
    };
}

function load_user(user, token) {
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_LOAD_USER',
            payload: { user: user, token: token }
        });
    };
}

function load_token(token) {
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_LOAD_TOKEN',
            payload: { token: token }
        });
    };
}

function complete(token, cb) {
    return function (dispatch) {
        dispatch(save_token(token));
        // sync user
        dispatch(sync_user(token.access_token, cb));
        dispatch({ type: 'OAUTH_COMPLETE' });
    };
}

function save_token(token) {
    return function (dispatch) {
        var exp = new Date();
        exp.setMonth(exp.getMonth() + 1);
        _reactCookie2.default.save('redux_oauth2', JSON.stringify(token), { path: '/', expires: exp });
        dispatch({
            type: 'OAUTH_SAVE_TOKEN',
            payload: token.access_token
        });
    };
}
function signout() {
    return function (dispatch) {
        try {
            //let token = react_cookie.load('redux_oauth2');
            _reactCookie2.default.remove('redux_oauth2');
            dispatch({ type: 'OAUTH_SIGNOUT' });

            // axios.delete(`${config.url}${config.token}`, {
            //     headers: {
            //         'Authorization': `Bearer ${token.access_token}`
            //     }
            // }).then(res => {
            //     react_cookie.remove('redux_oauth2');
            //     dispatch({
            //         type: 'OAUTH_SIGNOUT'
            //     })
            // }).catch(e => dispatch(actions.error(e)));
        } catch (e) {
            dispatch(error(e));
        }
    };
}

function sync_user(token, cb) {
    return function (dispatch) {
        (0, _libs.fetch_token)(token).then(function (res) {
            dispatch(load_user(res.data, token));
            cb(res.data);
        }).catch(actions.error);
    };
}

exports.default = {
    cancel: cancel,
    error: error,
    start: start,
    load_user: load_user,
    load_token: load_token,
    complete: complete,
    save_token: save_token,
    signout: signout,
    sync_user: sync_user
};

//
// export const actions = {
//     // cancel(){
//     //     return {
//     //         type: 'OAUTH_CANCELED'
//     //     }
//     // },
//     // error(error){
//     //     return {
//     //         type: 'OAUTH_ERROR',
//     //         payload: error,
//     //     }
//     // },
//     // start(){
//     //     return {
//     //         type: 'OAUTH_START',
//     //     }
//     // },
//     // load_user(user, token){
//     //     return {
//     //         type: 'OAUTH_LOAD_USER',
//     //         payload: {user, token},
//     //     }
//     // },
//     // load_token(token){
//     //     return {
//     //         type: 'OAUTH_LOAD_TOKEN',
//     //         payload: {token},
//     //     }
//     // },
//     // get_token(creds, cb){
//     //     return dispatch => {
//     //         dispatch(actions.start());
//     //         axios.post(`${config.url}${config.token}`, Object.assign({
//     //             client_id: config.client_id,
//     //             client_secret: config.client_secret,
//     //             grant_type: "password",
//     //             scope: "all",
//     //         }, creds)).then(res => {
//     //             dispatch(actions.complete(res.data, () => {
//     //                 cb(null, res.data);
//     //             }));
//     //         }).catch(e => {
//     //             cb(e);
//     //             dispatch(actions.error(e))
//     //         });
//     //     }
//     // },
//     // complete(token, cb){
//     //     return dispatch => {
//     //         // save token
//     //         dispatch(actions.save_token(token));
//     //         // sync user
//     //         dispatch(actions.sync_user(token.access_token, cb));
//     //         dispatch({type: 'OAUTH_COMPLETE'});
//     //     }
//     // },
//     // save_token(token){
//     //     const exp = new Date()
//     //     exp.setMonth(exp.getMonth()+1)
//     //     react_cookie.save('redux_oauth2', JSON.stringify(token), { path: '/', expires: exp });
//     //     return {
//     //         type: 'OAUTH_SAVE_TOKEN',
//     //         payload: token.access_token
//     //     }
//     // },
//     // signout(){
//     //     return dispatch => {
//     //         try {
//     //             //let token = react_cookie.load('redux_oauth2');
//     //             react_cookie.remove('redux_oauth2');
//     //             dispatch({ type: 'OAUTH_SIGNOUT' })
//     //             // axios.delete(`${config.url}${config.token}`, {
//     //             //     headers: {
//     //             //         'Authorization': `Bearer ${token.access_token}`
//     //             //     }
//     //             // }).then(res => {
//     //             //     react_cookie.remove('redux_oauth2');
//     //             //     dispatch({
//     //             //         type: 'OAUTH_SIGNOUT'
//     //             //     })
//     //             // }).catch(e => dispatch(actions.error(e)));
//     //         } catch (e) {
//     //             dispatch(actions.error(e))
//     //         }
//     //     }
//     // },
//     // sync_user(token, cb){
//     //     return dispatch => {
//     //         fetch_token(token).then(res => {
//     //             dispatch(actions.load_user(res.data, token))
//     //             cb(res.data);
//     //         }).catch(actions.error)
//     //     }
//     // }
// }