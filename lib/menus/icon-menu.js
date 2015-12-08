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

var _mixinsStylePropable = require('../mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _utilsEvents = require('../utils/events');

var _utilsEvents2 = _interopRequireDefault(_utilsEvents);

var _utilsPropTypes = require('../utils/prop-types');

var _utilsPropTypes2 = _interopRequireDefault(_utilsPropTypes);

var _menusMenu = require('../menus/menu');

var _menusMenu2 = _interopRequireDefault(_menusMenu);

var _stylesRawThemesLightRawTheme = require('../styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('../styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var _popoverPopover = require('../popover/popover');

var _popoverPopover2 = _interopRequireDefault(_popoverPopover);

var IconMenu = _react2['default'].createClass({
  displayName: 'IconMenu',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    anchorOrigin: _utilsPropTypes2['default'].origin,
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    closeOnItemTouchTap: _react2['default'].PropTypes.bool,
    iconButtonElement: _react2['default'].PropTypes.element.isRequired,
    iconStyle: _react2['default'].PropTypes.object,
    menuStyle: _react2['default'].PropTypes.object,
    onItemTouchTap: _react2['default'].PropTypes.func,
    onKeyboardFocus: _react2['default'].PropTypes.func,
    onMouseDown: _react2['default'].PropTypes.func,
    onMouseEnter: _react2['default'].PropTypes.func,
    onMouseLeave: _react2['default'].PropTypes.func,
    onMouseUp: _react2['default'].PropTypes.func,
    onTouchTap: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    targetOrigin: _utilsPropTypes2['default'].origin,
    touchTapCloseDelay: _react2['default'].PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeOnItemTouchTap: true,
      onItemTouchTap: function onItemTouchTap() {},
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseDown: function onMouseDown() {},
      onMouseLeave: function onMouseLeave() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseUp: function onMouseUp() {},
      onTouchTap: function onTouchTap() {},
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      targetOrigin: {
        vertical: 'top',
        horizontal: 'left'
      },
      touchTapCloseDelay: 200
    };
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default']),
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      menuInitiallyKeyboardFocused: false,
      open: false
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._timeout) clearTimeout(this._timeout);
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var anchorOrigin = _props.anchorOrigin;
    var className = _props.className;
    var closeOnItemTouchTap = _props.closeOnItemTouchTap;
    var iconButtonElement = _props.iconButtonElement;
    var iconStyle = _props.iconStyle;
    var onItemTouchTap = _props.onItemTouchTap;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseDown = _props.onMouseDown;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onMouseUp = _props.onMouseUp;
    var onTouchTap = _props.onTouchTap;
    var menuStyle = _props.menuStyle;
    var style = _props.style;
    var targetOrigin = _props.targetOrigin;

    var other = _objectWithoutProperties(_props, ['anchorOrigin', 'className', 'closeOnItemTouchTap', 'iconButtonElement', 'iconStyle', 'onItemTouchTap', 'onKeyboardFocus', 'onMouseDown', 'onMouseLeave', 'onMouseEnter', 'onMouseUp', 'onTouchTap', 'menuStyle', 'style', 'targetOrigin']);

    var _state = this.state;
    var open = _state.open;
    var anchorEl = _state.anchorEl;

    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      },

      menu: {
        position: 'relative'
      }
    };

    var mergedRootStyles = this.prepareStyles(styles.root, style);
    var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    var iconButton = _react2['default'].cloneElement(iconButtonElement, {
      onKeyboardFocus: this.props.onKeyboardFocus,
      iconStyle: this.mergeStyles(iconStyle, iconButtonElement.props.iconStyle),
      onTouchTap: function onTouchTap(e) {
        _this.open(_utilsEvents2['default'].isKeyboard(e), e);
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      },
      ref: this.state.iconButtonRef
    });

    var menu = _react2['default'].createElement(
      _menusMenu2['default'],
      _extends({}, other, {
        animateOpen: true,
        initiallyKeyboardFocused: this.state.menuInitiallyKeyboardFocused,
        onEscKeyDown: this._handleMenuEscKeyDown,
        onItemTouchTap: this._handleItemTouchTap,
        zDepth: 0,
        style: mergedMenuStyles }),
      this.props.children
    );

    return _react2['default'].createElement(
      'div',
      {
        className: className,
        onMouseDown: onMouseDown,
        onMouseLeave: onMouseLeave,
        onMouseEnter: onMouseEnter,
        onMouseUp: onMouseUp,
        onTouchTap: onTouchTap,
        style: mergedRootStyles },
      iconButton,
      _react2['default'].createElement(
        _popoverPopover2['default'],
        {
          anchorOrigin: anchorOrigin,
          targetOrigin: targetOrigin,
          open: open,
          anchorEl: anchorEl,
          childContextTypes: this.constructor.childContextTypes,
          useLayerForClickAway: false,
          onRequestClose: this.close,
          context: this.context },
        menu
      )
    );
  },

  isOpen: function isOpen() {
    return this.state.open;
  },

  close: function close(isKeyboard) {
    var _this2 = this;

    if (!this.state.open) {
      return;
    }
    this.setState({ open: false }, function () {
      //Set focus on the icon button when the menu close
      if (isKeyboard) {
        var iconButton = _this2.refs[_this2.state.iconButtonRef];
        _reactDom2['default'].findDOMNode(iconButton).focus();
        iconButton.setKeyboardFocus();
      }
    });
  },

  open: function open(menuInitiallyKeyboardFocused, event) {
    this.setState({
      open: true,
      menuInitiallyKeyboardFocused: menuInitiallyKeyboardFocused,
      anchorEl: event.currentTarget
    });
    event.preventDefault();
  },

  _handleItemTouchTap: function _handleItemTouchTap(event, child) {
    var _this3 = this;

    if (this.props.closeOnItemTouchTap) {
      (function () {
        var isKeyboard = _utilsEvents2['default'].isKeyboard(event);

        _this3._timeout = setTimeout(function () {
          if (!_this3.isMounted()) {
            return;
          }
          _this3.close(isKeyboard);
        }, _this3.props.touchTapCloseDelay);
      })();
    }

    this.props.onItemTouchTap(event, child);
  },

  _handleMenuEscKeyDown: function _handleMenuEscKeyDown() {
    this.close(true);
  }

});

exports['default'] = IconMenu;
module.exports = exports['default'];