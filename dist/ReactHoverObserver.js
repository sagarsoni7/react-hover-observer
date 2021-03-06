'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _object = require('object.omit');

var _object2 = _interopRequireDefault(_object);

var _noop = require('./utils/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
            isHovering: false
        };

        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);
        _this.onMouseOver = _this.onMouseOver.bind(_this);
        _this.onMouseOut = _this.onMouseOut.bind(_this);
        _this.setIsHovering = _this.setIsHovering.bind(_this);
        _this.unsetIsHovering = _this.unsetIsHovering.bind(_this);
        _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);

        _this.timerIds = [];
        return _this;
    }

    _createClass(_class, [{
        key: 'onMouseEnter',
        value: function onMouseEnter(e) {
            this.props.onMouseEnter({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave(e) {
            this.props.onMouseLeave({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseOver',
        value: function onMouseOver(e) {
            this.props.onMouseOver({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'onMouseOut',
        value: function onMouseOut(e) {
            this.props.onMouseOut({
                e: e,
                setIsHovering: this.setIsHovering,
                unsetIsHovering: this.unsetIsHovering
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimers();
        }
    }, {
        key: 'setIsHovering',
        value: function setIsHovering() {
            var _this2 = this;

            this.clearTimers();

            var hoverScheduleId = setTimeout(function () {
                var newState = { isHovering: true };
                _this2.setState(newState, function () {
                    _this2.props.onHoverChanged(newState);
                });
            }, this.props.hoverDelayInMs);

            this.timerIds.push(hoverScheduleId);
        }
    }, {
        key: 'unsetIsHovering',
        value: function unsetIsHovering() {
            var _this3 = this;

            this.clearTimers();

            var hoverOffScheduleId = setTimeout(function () {
                var newState = { isHovering: false };
                _this3.setState(newState, function () {
                    _this3.props.onHoverChanged(newState);
                });
            }, this.props.hoverOffDelayInMs);

            this.timerIds.push(hoverOffScheduleId);
        }
    }, {
        key: 'clearTimers',
        value: function clearTimers() {
            var ids = this.timerIds;
            while (ids.length) {
                clearTimeout(ids.pop());
            }
        }
    }, {
        key: 'getIsReactComponent',
        value: function getIsReactComponent(reactElement) {
            return typeof reactElement.type === 'function';
        }
    }, {
        key: 'shouldDecorateChild',
        value: function shouldDecorateChild(child) {
            return !!child && this.getIsReactComponent(child) && this.props.shouldDecorateChildren;
        }
    }, {
        key: 'decorateChild',
        value: function decorateChild(child, props) {
            return (0, _react.cloneElement)(child, props);
        }
    }, {
        key: 'renderChildrenWithProps',
        value: function renderChildrenWithProps(children, props) {
            var _this4 = this;

            if (typeof children === 'function') {
                return children(props);
            }

            return _react.Children.map(children, function (child) {
                return _this4.shouldDecorateChild(child) ? _this4.decorateChild(child, props) : child;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className;

            var childProps = (0, _objectAssign2.default)({}, { isHovering: this.state.isHovering }, (0, _object2.default)(this.props, ['children', 'className', 'hoverDelayInMs', 'hoverOffDelayInMs', 'onHoverChanged', 'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'shouldDecorateChildren']));

            return _react2.default.createElement(
                'tr',
                {
                    className: className,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                    onMouseOver: this.onMouseOver,
                    onMouseOut: this.onMouseOut
                },
                this.renderChildrenWithProps(children, childProps)
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.displayName = 'ReactHoverObserver';
_class.defaultProps = {
    hoverDelayInMs: 0,
    hoverOffDelayInMs: 0,
    onHoverChanged: _noop2.default,
    onMouseEnter: function onMouseEnter(_ref) {
        var setIsHovering = _ref.setIsHovering;
        return setIsHovering();
    },
    onMouseLeave: function onMouseLeave(_ref2) {
        var unsetIsHovering = _ref2.unsetIsHovering;
        return unsetIsHovering();
    },
    onMouseOver: _noop2.default,
    onMouseOut: _noop2.default,
    shouldDecorateChildren: true
};
_class.propTypes = {
    className: _propTypes2.default.string,
    hoverDelayInMs: _propTypes2.default.number,
    hoverOffDelayInMs: _propTypes2.default.number,
    onHoverChanged: _propTypes2.default.func,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseOver: _propTypes2.default.func,
    onMouseOut: _propTypes2.default.func,
    shouldDecorateChildren: _propTypes2.default.bool
};
exports.default = _class;
;