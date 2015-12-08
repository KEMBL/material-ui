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

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _mixinsClickAwayable = require('./mixins/click-awayable');

var _mixinsClickAwayable2 = _interopRequireDefault(_mixinsClickAwayable);

var _utilsKeyCode = require('./utils/key-code');

var _utilsKeyCode2 = _interopRequireDefault(_utilsKeyCode);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _menusMenu = require('./menus/menu');

var _menusMenu2 = _interopRequireDefault(_menusMenu);

var _menusMenuItem = require('./menus/menu-item');

var _menusMenuItem2 = _interopRequireDefault(_menusMenuItem);

var _menusMenuDivider = require('./menus/menu-divider');

var _menusMenuDivider2 = _interopRequireDefault(_menusMenuDivider);

var AutoComplete = _react2['default'].createClass({
  displayName: 'AutoComplete',

  mixins: [_mixinsStylePropable2['default'], _mixinsClickAwayable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    animated: _react2['default'].PropTypes.bool,
    dataSource: _react2['default'].PropTypes.array,
    disableFocusRipple: _react2['default'].PropTypes.bool,
    errorStyle: _react2['default'].PropTypes.object,
    errorText: _react2['default'].PropTypes.string,
    filter: _react2['default'].PropTypes.func,
    floatingLabelText: _react2['default'].PropTypes.string,
    fullWidth: _react2['default'].PropTypes.bool,
    hintText: _react2['default'].PropTypes.string,
    listStyle: _react2['default'].PropTypes.object,
    menuCloseDelay: _react2['default'].PropTypes.number,
    menuProps: _react2['default'].PropTypes.object,
    menuStyle: _react2['default'].PropTypes.object,
    onNewRequest: _react2['default'].PropTypes.func,
    onUpdateInput: _react2['default'].PropTypes.func,
    open: _react2['default'].PropTypes.bool,
    searchText: _react2['default'].PropTypes.string,
    showAllItems: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object,
    touchTapCloseDelay: _react2['default'].PropTypes.number,
    updateWhenFocused: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animated: true,
      fullWidth: false,
      open: false,
      showAllItems: false,
      searchText: '',
      menuCloseDelay: 100,
      disableFocusRipple: true,
      updateWhenFocused: false,
      onUpdateInput: function onUpdateInput() {},
      onNewRequest: function onNewRequest() {},
      filter: function filter(searchText, key) {
        return key.includes(searchText);
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      searchText: this.props.searchText,
      open: this.props.open
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.searchText !== nextProps.searchText) {
      this.setState({
        searchText: nextProps.searchText
      });
    }
  },
  componentWillMount: function componentWillMount() {
    this.focusOnInput = false;
    this.requestsList = [];
  },

  componentClickAway: function componentClickAway() {
    this.setState({ open: false });
    this.focusOnInput = false;
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var animated = _props.animated;
    var style = _props.style;
    var errorStyle = _props.errorStyle;
    var floatingLabelText = _props.floatingLabelText;
    var hintText = _props.hintText;
    var fullWidth = _props.fullWidth;
    var menuStyle = _props.menuStyle;
    var menuProps = _props.menuProps;
    var listStyle = _props.listStyle;
    var showAllItems = _props.showAllItems;

    var other = _objectWithoutProperties(_props, ['animated', 'style', 'errorStyle', 'floatingLabelText', 'hintText', 'fullWidth', 'menuStyle', 'menuProps', 'listStyle', 'showAllItems']);

    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative',
        width: this.props.fullWidth ? '100%' : 256
      },
      input: {},
      error: {},
      menu: {
        top: this.props.floatingLabelText ? 64 : 40,
        left: 0,
        width: '100%'
      },
      list: {
        display: 'block',
        width: this.props.fullWidth ? '100%' : 256
      }
    };

    var textFieldProps = {
      style: this.mergeAndPrefix(styles.input, style),
      floatingLabelText: floatingLabelText,
      hintText: !hintText && !floatingLabelText ? '' : hintText,
      fullWidth: true,
      multiLine: false,
      errorStyle: this.mergeAndPrefix(styles.error, errorStyle)
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    var displayFilter = showAllItems ? function () {
      return true;
    } : this.props.filter;
    var requestsList = [];

    this.props.dataSource.map(function (item) {
      switch (typeof item) {
        case 'string':
          if (displayFilter(_this.state.searchText, item, item)) {
            requestsList.push(item);
          }
          break;
        case 'object':
          if (typeof item.text === 'string') {
            if (displayFilter(_this.state.searchText, item.text, item.value)) {
              requestsList.push(item);
            } else if (item.display) {
              requestsList.push(item);
            }
          }
          break;
      }
    });

    this.requestsList = requestsList;

    var menu = this.state.open && (this.state.searchText !== '' || showAllItems) && requestsList.length > 0 ? _react2['default'].createElement(
      _menusMenu2['default'],
      _extends({}, menuProps, {
        ref: 'menu',
        key: 'dropDownMenu',
        animated: animated,
        autoWidth: false,
        initiallyKeyboardFocused: false,
        onEscKeyDown: function () {
          return _this.setState({ open: false });
        },
        onItemTouchTap: this._handleItemTouchTap,
        listStyle: this.mergeAndPrefix(styles.list, listStyle),
        openDirection: 'bottom-left',
        style: mergedMenuStyles }),
      requestsList.map(function (request, index) {
        switch (typeof request) {
          case 'string':
            return _react2['default'].createElement(_menusMenuItem2['default'], {
              disableFocusRipple: _this.props.disableFocusRipple,
              innerDivStyle: { overflow: 'hidden' },
              key: index,
              value: request,
              primaryText: request
            });
          case 'object':
            if (typeof request.text === 'string') {
              return _react2['default'].cloneElement(request.value, {
                key: request.text,
                disableFocusRipple: _this.props.disableFocusRipple
              });
            }
            return _react2['default'].cloneElement(request, {
              key: index,
              disableFocusRipple: _this.props.disableFocusRipple
            });
          default:
            return null;
        }
      })
    ) : null;

    return _react2['default'].createElement(
      'div',
      { style: mergedRootStyles,
        onKeyDown: this._handleKeyDown },
      _react2['default'].createElement(
        'div',
        {
          style: {
            width: '100%'
          } },
        _react2['default'].createElement(_textField2['default'], _extends({}, other, {
          ref: 'searchTextField',
          value: this.state.searchText,
          onEnterKeyDown: function () {
            setTimeout(function () {
              _this.setState({ open: false });
            }, _this.props.touchTapCloseDelay);
            _this.props.onNewRequest(_this.state.searchText);
          },
          onChange: function (e) {
            var searchText = e.target.value;
            _this._updateRequests(searchText);
          },
          onBlur: function () {
            if (_this.focusOnInput && _this.state.open) _this.refs.searchTextField.focus();
          },
          onFocus: function () {
            if (!_this.state.open && (showAllItems || _this.props.updateWhenFocused || _this.state.searchText !== '')) {
              _this._updateRequests(_this.state.searchText);
            }
            _this.focusOnInput = true;
          }

        }, textFieldProps))
      ),
      _react2['default'].createElement(
        _reactAddonsTransitionGroup2['default'],
        null,
        menu
      )
    );
  },

  setValue: function setValue(textValue) {
    this.setState({
      searchText: textValue
    });
  },

  getValue: function getValue() {
    return this.state.searchText;
  },

  _updateRequests: function _updateRequests(searchText) {

    this.setState({
      searchText: searchText,
      open: true
    });

    this.focusOnInput = true;

    this.props.onUpdateInput(searchText, this.props.dataSource);
  },

  _handleItemTouchTap: function _handleItemTouchTap(e, child) {
    var _this2 = this;

    setTimeout(function () {
      _this2.setState({ open: false });
    }, this.props.touchTapCloseDelay);

    var dataSource = this.props.dataSource;

    var chosenRequest = undefined,
        index = undefined,
        searchText = undefined;
    if (typeof dataSource[0] === 'string') {
      chosenRequest = this.requestsList[parseInt(child.key, 10)];
      index = dataSource.indexOf(chosenRequest);
      searchText = dataSource[index];
    } else {
      chosenRequest = child.key;
      index = dataSource.indexOf(dataSource.filter(function (item) {
        return chosenRequest === item.text;
      })[0]);
      searchText = chosenRequest;
    }

    this.setState({ searchText: searchText });

    this.props.onNewRequest(chosenRequest, index, dataSource);
  },

  _handleKeyDown: function _handleKeyDown(e) {
    switch (e.keyCode) {
      case _utilsKeyCode2['default'].ESC:
        this.setState({ open: false });
        break;
      case _utilsKeyCode2['default'].DOWN:
        if (this.focusOnInput && this.state.open) {
          e.preventDefault();
          this.focusOnInput = false;
          this.setState({ open: true });
        }
        break;
      default:
        break;
    }
  }

});

AutoComplete.Item = _menusMenuItem2['default'];
AutoComplete.Divider = _menusMenuDivider2['default'];

exports['default'] = AutoComplete;
module.exports = exports['default'];