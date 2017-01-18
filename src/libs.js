import axios from 'axios'

export function fetch_token(token) {
    return axios.get(`${config.url}${config.token}?client=${config.clientID}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
