'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsExtend = require('../utils/extend');

var _utilsExtend2 = _interopRequireDefault(_utilsExtend);

var _svgIconsHardwareKeyboardArrowUp = require('../svg-icons/hardware/keyboard-arrow-up');

var _svgIconsHardwareKeyboardArrowUp2 = _interopRequireDefault(_svgIconsHardwareKeyboardArrowUp);

var _svgIconsHardwareKeyboardArrowDown = require('../svg-icons/hardware/keyboard-arrow-down');

var _svgIconsHardwareKeyboardArrowDown2 = _interopRequireDefault(_svgIconsHardwareKeyboardArrowDown);

var _iconButton = require('../icon-button');

var _iconButton2 = _interopRequireDefault(_iconButton);

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _mixinsContextPure = require('../mixins/context-pure');

var _mixinsContextPure2 = _interopRequireDefault(_mixinsContextPure);

var CardExpandable = _react2['default'].createClass({
  displayName: 'CardExpandable',

  mixins: [_mixinsStylePropable2['default'], _mixinsContextPure2['default']],

  getStyles: function getStyles() {
    var contextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var directionStyle = contextKeys.isRtl ? {
      left: 4
    } : {
      right: 4
    };

    return {
      root: (0, _utilsExtend2['default'])({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute'
      }, directionStyle)
    };
  },

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    expanded: _react2['default'].PropTypes.bool,
    onExpanding: _react2['default'].PropTypes.func.isRequired,
    style: _react2['default'].PropTypes.object
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

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      return {
        isRtl: muiTheme.isRtl
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [_iconButton2['default']];
    }
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

  render: function render() {
    var styles = this.getStyles();

    var expandable = undefined;
    if (this.props.expanded === true) expandable = _react2['default'].createElement(_svgIconsHardwareKeyboardArrowUp2['default'], null);else expandable = _react2['default'].createElement(_svgIconsHardwareKeyboardArrowDown2['default'], null);

    var mergedStyles = this.mergeStyles(styles.root, this.props.style);

    var expandableBtn = _react2['default'].createElement(
      _iconButton2['default'],
      {
        style: mergedStyles,
        onTouchTap: this.props.onExpanding },
      expandable
    );

    return expandableBtn;
  }
});

exports['default'] = CardExpandable;
module.exports = exports['default'];