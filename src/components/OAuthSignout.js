import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../actions/oauthAction'
import _ from 'lodash'


export default function OAuthSignin (Button) {

    class OAuthSignoutComponent extends React.Component {
        static defaultProps = {
            onClick: function () {
            }
        }

        handleClick() {
            this.props.actions.signout();
        }

        render() {
            let {oauth, dispatch, actions, ...rest} = this.props;
            let props = Object.assign({}, rest);
            props.disabled = !(oauth.authenticating || oauth.user !== null);
            props.onClick = _.wrap(props.onClick, (func, e) => {
                this.handleClick(e);
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
    )(OAuthSignoutComponent)
}