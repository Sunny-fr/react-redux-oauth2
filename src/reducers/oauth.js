export const defaultState = {
    authenticating: false,
    user: null,
    error: null,
    token: null
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'OAUTH_START':
            return {...state, authenticating: true, user: null, error: null}
            break;
        case 'OAUTH_CANCELED':
            return {...state, authenticating: false, user: null, error: 'user canceled'}
        case 'OAUTH_ERROR':
            return {...state, authenticating: false, user: null, error: action.payload}
            break;
        case 'OAUTH_LOAD_USER':
            return {
                ...state,
                authenticating: false,
                user: action.payload.user,
                token: action.payload.token,
                error: null
            }
            break;
        case 'OAUTH_LOAD_TOKEN':
            return {...state, authenticating: false, token: action.payload.token, error: null}
            break;
        case 'OAUTH_SAVE_TOKEN':
            return {...state, authenticating: false, token: action.payload, error: null}
            break;
        case 'OAUTH_SIGNOUT':
            return {...state, authenticating: false, user: null, token: null, error: null}
            break;
        default:
            return state;
    }
}
