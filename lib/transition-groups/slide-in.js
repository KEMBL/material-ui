'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _slideInChild = require('./slide-in-child');

var _slideInChild2 = _interopRequireDefault(_slideInChild);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var SlideIn = _react2['default'].createClass({
  displayName: 'SlideIn',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  propTypes: {
    childStyle: _react2['default'].PropTypes.object,
    children: _react2['default'].PropTypes.node,
    direction: _react2['default'].PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterDelay: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left'
    };
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var enterDelay = _props.enterDelay;
    var children = _props.children;
    var childStyle = _props.childStyle;
    var direction = _props.direction;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['enterDelay', 'children', 'childStyle', 'direction', 'style']);

    var mergedRootStyles = this.prepareStyles({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, style);

    var newChildren = _react2['default'].Children.map(children, function (child) {
      return _react2['default'].createElement(
        _slideInChild2['default'],
        {
          key: child.key,
          direction: direction,
          enterDelay: enterDelay,
          getLeaveDirection: _this._getLeaveDirection,
          style: childStyle },
        child
      );
    }, this);

    return _react2['default'].createElement(
      _reactAddonsTransitionGroup2['default'],
      _extends({}, other, {
        style: mergedRootStyles,
        component: 'div' }),
      newChildren
    );
  },

  _getLeaveDirection: function _getLeaveDirection() {
    return this.props.direction;
  }

});

exports['default'] = SlideIn;
module.exports = exports['default'];