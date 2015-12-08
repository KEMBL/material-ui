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

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _utilsColorManipulator = require('./utils/color-manipulator');

var _utilsColorManipulator2 = _interopRequireDefault(_utilsColorManipulator);

var _enhancedButton = require('./enhanced-button');

var _enhancedButton2 = _interopRequireDefault(_enhancedButton);

var _fontIcon = require('./font-icon');

var _fontIcon2 = _interopRequireDefault(_fontIcon);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _utilsChildren = require('./utils/children');

var _utilsChildren2 = _interopRequireDefault(_utilsChildren);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var FloatingActionButton = _react2['default'].createClass({
  displayName: 'FloatingActionButton',

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

  propTypes: {
    backgroundColor: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node,
    disabled: _react2['default'].PropTypes.bool,
    disabledColor: _react2['default'].PropTypes.string,
    iconClassName: _react2['default'].PropTypes.string,
    iconStyle: _react2['default'].PropTypes.object,
    mini: _react2['default'].PropTypes.bool,
    onMouseDown: _react2['default'].PropTypes.func,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    onMouseUp: _react2['default'].PropTypes.func,
    onTouchEnd: _react2['default'].PropTypes.func,
    onTouchStart: _react2['default'].PropTypes.func,
    secondary: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
  },

  getInitialState: function getInitialState() {
    var zDepth = this.props.disabled ? 0 : 2;

    return {
      hovered: false,
      initialZDepth: zDepth,
      touch: false,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (newProps.disabled !== this.props.disabled) {
      var zDepth = newProps.disabled ? 0 : 2;

      this.setState({
        zDepth: zDepth,
        initialZDepth: zDepth
      });
    }
  },

  componentDidMount: function componentDidMount() {
    true ? (0, _warning2['default'])(!this.props.iconClassName || !this.props.children, 'You have set both an iconClassName and a child icon. ' + 'It is recommended you use only one method when adding ' + 'icons to FloatingActionButtons.') : undefined;
  },

  _getBackgroundColor: function _getBackgroundColor() {
    return this.props.disabled ? this.props.disabledColor || this.getTheme().disabledColor : this.props.backgroundColor ? this.props.backgroundColor : this.props.secondary ? this.getTheme().secondaryColor : this.getTheme().color;
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.floatingActionButton;
  },

  _getIconColor: function _getIconColor() {
    return this.props.disabled ? this.getTheme().disabledTextColor : this.props.secondary ? this.getTheme().secondaryIconColor : this.getTheme().iconColor;
  },

  getStyles: function getStyles() {
    var themeVariables = this.state.muiTheme.floatingActionButton;

    var styles = {
      root: {
        transition: _stylesTransitions2['default'].easeOut(),
        display: 'inline-block'
      },
      container: {
        transition: _stylesTransitions2['default'].easeOut(),
        position: 'relative',
        height: themeVariables.buttonSize,
        width: themeVariables.buttonSize,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: this._getBackgroundColor(),
        borderRadius: '50%',
        textAlign: 'center',
        verticalAlign: 'bottom',
        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)'
      },
      containerWhenMini: {
        height: themeVariables.miniSize,
        width: themeVariables.miniSize
      },
      overlay: {
        transition: _stylesTransitions2['default'].easeOut(),
        top: 0
      },
      overlayWhenHovered: {
        backgroundColor: _utilsColorManipulator2['default'].fade(this._getIconColor(), 0.4)
      },
      icon: {
        height: themeVariables.buttonSize,
        lineHeight: themeVariables.buttonSize + 'px',
        fill: themeVariables.iconColor,
        color: this._getIconColor()
      },
      iconWhenMini: {
        height: themeVariables.miniSize,
        lineHeight: themeVariables.miniSize + 'px'
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var mini = _props.mini;
    var secondary = _props.secondary;
    var iconStyle = _props.iconStyle;
    var iconClassName = _props.iconClassName;

    var other = _objectWithoutProperties(_props, ['disabled', 'mini', 'secondary', 'iconStyle', 'iconClassName']);

    var styles = this.getStyles();

    var iconElement = undefined;
    if (iconClassName) {
      iconElement = _react2['default'].createElement(_fontIcon2['default'], {
        className: iconClassName,
        style: this.mergeStyles(styles.icon, mini && styles.iconWhenMini, iconStyle) });
    }

    var children = _utilsChildren2['default'].extend(this.props.children, {
      style: this.mergeStyles(styles.icon, mini && styles.iconWhenMini, iconStyle)
    });

    var buttonEventHandlers = disabled ? null : {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus
    };

    return _react2['default'].createElement(
      _paper2['default'],
      {
        style: this.mergeStyles(styles.root, this.props.style),
        zDepth: this.state.zDepth,
        circle: true },
      _react2['default'].createElement(
        _enhancedButton2['default'],
        _extends({}, other, buttonEventHandlers, {
          ref: 'container',
          disabled: disabled,
          style: this.mergeStyles(styles.container, this.props.mini && styles.containerWhenMini, iconStyle),
          focusRippleColor: styles.icon.color,
          touchRippleColor: styles.icon.color }),
        _react2['default'].createElement(
          'div',
          {
            ref: 'overlay',
            style: this.prepareStyles(styles.overlay, this.state.hovered && !this.props.disabled && styles.overlayWhenHovered) },
          iconElement,
          children
        )
      )
    );
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function _handleMouseUp(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) {
      this.setState({ hovered: true });
    }
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1
    });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function _handleTouchEnd(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      _reactDom2['default'].findDOMNode(this.refs.overlay).style.backgroundColor = _utilsColorManipulator2['default'].fade(this.getStyles().icon.color, 0.4);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      _reactDom2['default'].findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  }

});

exports['default'] = FloatingActionButton;
module.exports = exports['default'];