'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _utilsPropTypes = require('./utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var Paper = _react2['default'].createClass({
  displayName: 'Paper',

  mixins: [_reactAddonsPureRenderMixin2['default'], _mixinsStylePropable2['default']],

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
    children: _react2['default'].PropTypes.node,
    circle: _react2['default'].PropTypes.bool,
    rounded: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    transitionEnabled: _react2['default'].PropTypes.bool,
    zDepth: _utilsPropTypes2['default'].zDepth
  },

  getDefaultProps: function getDefaultProps() {
    return {
      circle: false,
      rounded: true,
      transitionEnabled: true,
      zDepth: 1
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var circle = _props.circle;
    var rounded = _props.rounded;
    var style = _props.style;
    var transitionEnabled = _props.transitionEnabled;
    var zDepth = _props.zDepth;

    var other = _objectWithoutProperties(_props, ['children', 'circle', 'rounded', 'style', 'transitionEnabled', 'zDepth']);

    var styles = {
      backgroundColor: this.state.muiTheme.paper.backgroundColor,
      transition: transitionEnabled && _stylesTransitions2['default'].easeOut(),
      boxSizing: 'border-box',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxShadow: this._getZDepthShadows(zDepth),
      borderRadius: circle ? '50%' : rounded ? '2px' : '0px'
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, other, { style: this.prepareStyles(styles, style) }),
      children
    );
  },

  _getZDepthShadows: function _getZDepthShadows(zDepth) {
    var shadows = [null, '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)', '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)', '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)', '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)', '0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)'];

    return shadows[zDepth];
  }

});

exports['default'] = Paper;
module.exports = exports['default'];