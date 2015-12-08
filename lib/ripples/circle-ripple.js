'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesAutoPrefix = require('../styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesColors = require('../styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var CircleRipple = _react2['default'].createClass({
  displayName: 'CircleRipple',

  mixins: [_reactAddonsPureRenderMixin2['default'], _mixinsStylePropable2['default']],

  propTypes: {
    color: _react2['default'].PropTypes.string,
    opacity: _react2['default'].PropTypes.number,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: _stylesColors2['default'].darkBlack,
      opacity: 0.16
    };
  },

  componentWillAppear: function componentWillAppear(callback) {
    this._initializeAnimation(callback);
  },

  componentWillEnter: function componentWillEnter(callback) {
    this._initializeAnimation(callback);
  },

  componentDidAppear: function componentDidAppear() {
    this._animate();
  },

  componentDidEnter: function componentDidEnter() {
    this._animate();
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this = this;

    var style = _reactDom2['default'].findDOMNode(this).style;
    style.opacity = 0;
    setTimeout(function () {
      if (_this.isMounted()) callback();
    }, 2000);
  },

  render: function render() {
    var _props = this.props;
    var color = _props.color;
    var opacity = _props.opacity;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['color', 'opacity', 'style']);

    var mergedStyles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color
    }, style);

    return _react2['default'].createElement('div', _extends({}, other, { style: mergedStyles }));
  },

  _animate: function _animate() {
    var style = _reactDom2['default'].findDOMNode(this).style;
    var transitionValue = _stylesTransitions2['default'].easeOut('2s', 'opacity') + ',' + _stylesTransitions2['default'].easeOut('1s', 'transform');
    _stylesAutoPrefix2['default'].set(style, 'transition', transitionValue);
    _stylesAutoPrefix2['default'].set(style, 'transform', 'scale(1)');
  },

  _initializeAnimation: function _initializeAnimation(callback) {
    var _this2 = this;

    var style = _reactDom2['default'].findDOMNode(this).style;
    style.opacity = this.props.opacity;
    _stylesAutoPrefix2['default'].set(style, 'transform', 'scale(0)');
    setTimeout(function () {
      if (_this2.isMounted()) callback();
    }, 0);
  }

});

exports['default'] = CircleRipple;
module.exports = exports['default'];