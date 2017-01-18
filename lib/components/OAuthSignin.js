'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = OAuthSignin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _oauthAction = require('../actions/oauthAction');

var _oauthAction2 = _interopRequireDefault(_oauthAction);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function OAuthSignin(Button) {
    var OAuthSigninComponent = function (_React$Component) {
        _inherits(OAuthSigninComponent, _React$Component);

        function OAuthSigninComponent() {
            _classCallCheck(this, OAuthSigninComponent);

            return _possibleConstructorReturn(this, (OAuthSigninComponent.__proto__ || Object.getPrototypeOf(OAuthSigninComponent)).apply(this, arguments));
        }

        _createClass(OAuthSigninComponent, [{
            key: 'handleClick',
            value: function handleClick(e, provider) {
                var url = '' + _config2.default.url + _config2.default.providers[provider] + '?client=' + _config2.default.clientID;
                var name = 'connecting to ' + provider;
                var settings = 'scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no,top=100,left=100,width=600,height=500';
                this.props.actions.start();
                var popup = window.open(url, name, settings);
                this.listenPopup(popup);
            }
        }, {
            key: 'listenPopup',
            value: function listenPopup(popup) {
                if (popup.closed) {
                    this.props.actions.cancel();
                    this.props.onCancel();
                    // dispatch auth canceled
                } else {
                    var token = void 0;
                    try {
                        token = _queryString2.default.parse(popup.location.search.substr(1));
                    } catch (e) {}
                    if (token && token.access_token) {
                        //WTF ?
                        this.props.actions.complete(token, this.props.onSuccess);
                        popup.close();
                    } else {
                        setTimeout(this.listenPopup.bind(this, popup), 0);
                    }
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props = this.props,
                    oauth = _props.oauth,
                    actions = _props.actions,
                    provider = _props.provider,
                    onCancel = _props.onCancel,
                    onSuccess = _props.onSuccess,
                    onFailed = _props.onFailed,
                    rest = _objectWithoutProperties(_props, ['oauth', 'actions', 'provider', 'onCancel', 'onSuccess', 'onFailed']);

                var props = Object.assign({}, rest);
                props.disabled = oauth.authenticating || oauth.user !== null;
                props.onClick = _lodash2.default.wrap(props.onClick, function (func, e) {
                    _this2.handleClick(e, provider);
                    return func(e);
                });
                return _react2.default.createElement(Button, props);
            }
        }]);

        return OAuthSigninComponent;
    }(_react2.default.Component);

    OAuthSigninComponent.defaultProps = {
        onClick: function onClick() {},
        onCancel: function onCancel() {},
        onSuccess: function onSuccess() {},
        onFailed: function onFailed() {}
    };

    return (0, _reactRedux.connect)(function (store) {
        return {
            oauth: store.oauth
        };
    }, function (dispatch) {
        return {
            actions: (0, _redux.bindActionCreators)(_oauthAction2.default, dispatch)
        };
    })(OAuthSigninComponent);
}

// export default connect((store) => {
//     return {oauth: store.oauth}
// })(OAuthSigninComponent)

//
// export function OAuthSignin(Button) {
//     return connect(state => ({oauth: state.oauth}), dispatch => ({actions: bindActionCreators(actions, dispatch)}))(
//         )
// }