'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.OAuthSignout = OAuthSignout;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function OAuthSignout(Button) {
    var _class, _temp;

    return connect(function (state) {
        return { oauth: state.oauth };
    }, function (dispatch) {
        return { actions: bindActionCreators(actions, dispatch) };
    })((_temp = _class = function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        _createClass(_class, [{
            key: 'handleClick',
            value: function handleClick() {
                this.props.actions.signout();
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props = this.props,
                    oauth = _props.oauth,
                    dispatch = _props.dispatch,
                    actions = _props.actions,
                    rest = _objectWithoutProperties(_props, ['oauth', 'dispatch', 'actions']);

                var props = Object.assign({}, rest);
                props.disabled = !(oauth.authenticating || oauth.user !== null);
                props.onClick = _.wrap(props.onClick, function (func, e) {
                    _this2.handleClick(e);
                    return func(e);
                });
                return _react2.default.createElement(Button, props);
            }
        }]);

        return _class;
    }(_react2.default.Component), _class.defaultProps = {
        onClick: function onClick() {}
    }, _temp));
}