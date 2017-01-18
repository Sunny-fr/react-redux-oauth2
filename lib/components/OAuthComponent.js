'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.OAuthComponent = OAuthComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function OAuthComponent(Component) {
    return (0, _reactRedux.connect)(function (state) {
        return { oauth: state.oauth };
    }, function (dispatch) {
        return { oauth_actions: bindActionCreators(actions, dispatch) };
    })(function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                var auth_info = react_cookie.load('redux_oauth2');
                if (this.props.oauth.user === null && auth_info && auth_info.access_token) {
                    this.props.oauth_actions.sync_user(auth_info.access_token);
                } else if (auth_info && auth_info.access_token) {
                    this.props.oauth_actions.load_token(auth_info);
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    oauth = _props.oauth,
                    oauth_actions = _props.oauth_actions,
                    rest = _objectWithoutProperties(_props, ['oauth', 'oauth_actions']);

                var props = Object.assign({}, rest);
                return _react2.default.createElement(Component, props);
            }
        }]);

        return _class;
    }(_react2.default.Component));
}