import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import config from '../config'
import actions from '../actions/oauthAction'
import _ from 'lodash'
import querystring from 'query-string'

export default function OAuthSignin (Button) {
    class OAuthSigninComponent extends React.Component {
        static defaultProps = {
            onClick: function () {
            },
            onCancel: function () {
            },
            onSuccess: function () {
            },
            onFailed: function () {
            }
        }

        handleClick(e, provider) {
            let url = `${config.url}${config.providers[provider]}?client=${config.clientID}`;
            let name = 'connecting to ' + provider;
            let settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no,top=100,left=100,width=600,height=500';
            this.props.actions.start()
            let popup = window.open(url, name, settings);
            this.listenPopup(popup);
        }

        listenPopup(popup) {
            if (popup.closed) {
                this.props.actions.cancel()
                this.props.onCancel();
                // dispatch auth canceled
            } else {
                let token;
                try {
                    token = querystring.parse(popup.location.search.substr(1));
                } catch (e) {
                }
                if (token && token.access_token) {
                    //WTF ?
                    this.props.actions.complete(token, this.props.onSuccess);
                    popup.close();
                } else {
                    setTimeout(this.listenPopup.bind(this, popup), 0);
                }
            }
        }

        render() {
            let {oauth, actions, dispatch, provider, onCancel, onSuccess, onFailed, ...rest} = this.props;
            let props = Object.assign({}, rest);
            props.disabled = oauth.authenticating || oauth.user !== null;
            props.onClick = _.wrap(props.onClick, (func, e) => {
                this.handleClick(e, provider);
                return func(e);
            });
            return <Button {...props} />
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
    )(OAuthSigninComponent)
}