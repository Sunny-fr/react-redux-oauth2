
import react_cookie from 'react-cookie'
import {fetch_token} from '../libs'

export function cancel(){
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_CANCELED'
        })
    }
}

export function error(error){
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_ERROR',
            payload: error,
        })
    }
}

export function start(){
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_START'
        })
    }
}


export function load_user(user, token){
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_LOAD_USER',
            payload: {user, token},
        })
    }
}

export function load_token(token){
    return function (dispatch) {
        dispatch({
            type: 'OAUTH_LOAD_TOKEN',
            payload: {token},
        })
    }
}

export function complete(token, cb){
    return function (dispatch) {
        dispatch(save_token(token));
        // sync user
        dispatch(sync_user(token.access_token, cb));
        dispatch({type: 'OAUTH_COMPLETE'});
    }
}

export function save_token(token){
    return function (dispatch) {
        const exp = new Date()
        exp.setMonth(exp.getMonth()+1)
        react_cookie.save('redux_oauth2', JSON.stringify(token), { path: '/', expires: exp });
        dispatch({
            type: 'OAUTH_SAVE_TOKEN',
            payload: token.access_token
        })
    }
}
export function signout () {
    return function (dispatch) {
        try {
            //let token = react_cookie.load('redux_oauth2');
            react_cookie.remove('redux_oauth2');
            dispatch({ type: 'OAUTH_SIGNOUT' })

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
            dispatch(error(e))
        }
    }

}

export function sync_user(token, cb){
    return function (dispatch) {
        fetch_token(token).then(res => {
            dispatch(load_user(res.data, token))
            cb(res.data);
        }).catch(actions.error)
    }
}




export default {
    cancel,
    error,
    start,
    load_user,
    load_token,
    complete,
    save_token,
    signout,
    sync_user
}
