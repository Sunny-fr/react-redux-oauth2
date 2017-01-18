import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions/oauthAction'
import react_cookie from 'react-cookie'



export function OAuthComponent(Component) {

    class OAuthBootsrapComponent extends React.Component {
        componentWillMount() {
            let auth_info = react_cookie.load('redux_oauth2');
            if (this.props.oauth.user === null && auth_info && auth_info.access_token) {
                this.props.oauth_actions.sync_user(auth_info.access_token);
            }else if(auth_info && auth_info.access_token) {
                this.props.oauth_actions.load_token(auth_info)
            }
        }

        render() {
            let {oauth, oauth_actions, ...rest} = this.props;
            let props = Object.assign({}, rest);
            return <Component {...props} />
        }
    }

    return connect((store) =>
            ({
                oauth: store.oauth
            }),
        dispatch =>
            ({
                actions: bindActionCreators(actions, dispatch)
            })
    )(OAuthBootsrapComponent)
}