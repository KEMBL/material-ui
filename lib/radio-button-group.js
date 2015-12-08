'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radioButton = require('./radio-button');

var _radioButton2 = _interopRequireDefault(_radioButton);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var RadioButtonGroup = _react2['default'].createClass({
  displayName: 'RadioButtonGroup',

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
    children: _react2['default'].PropTypes.node,
    className: _react2['default'].PropTypes.string,
    defaultSelected: _react2['default'].PropTypes.string,
    labelPosition: _react2['default'].PropTypes.oneOf(['left', 'right']),
    name: _react2['default'].PropTypes.string.isRequired,
    onChange: _react2['default'].PropTypes.func,
    style: _react2['default'].PropTypes.object,
    valueSelected: _react2['default'].PropTypes.string
  },

  _hasCheckAttribute: function _hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && radioButton.props.checked;
  },

  getInitialState: function getInitialState() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      style: {}
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    var cnt = 0;

    _react2['default'].Children.forEach(this.props.children, function (option) {
      if (_this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({ numberCheckedRadioButtons: cnt });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    var newState = { muiTheme: newMuiTheme };

    if (nextProps.hasOwnProperty('valueSelected')) {
      newState.selected = nextProps.valueSelected;
    }

    this.setState(newState);
  },

  render: function render() {
    var _this2 = this;

    var options = _react2['default'].Children.map(this.props.children, function (option) {
      var _option$props = option.props;
      var name = _option$props.name;
      var value = _option$props.value;
      var label = _option$props.label;
      var onCheck = _option$props.onCheck;

      var other = _objectWithoutProperties(_option$props, ['name', 'value', 'label', 'onCheck']);

      return _react2['default'].createElement(_radioButton2['default'], _extends({}, other, {
        ref: option.props.value,
        name: _this2.props.name,
        key: option.props.value,
        value: option.props.value,
        label: option.props.label,
        labelPosition: _this2.props.labelPosition,
        onCheck: _this2._onChange,
        checked: option.props.value === _this2.state.selected }));
    }, this);

    return _react2['default'].createElement(
      'div',
      {
        style: this.prepareStyles(this.props.style),
        className: this.props.className || '' },
      options
    );
  },

  _updateRadioButtons: function _updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({ selected: newSelection });
    } else if (true) {
      var message = 'Cannot select a different radio button while another radio button ' + "has the 'checked' property set to true.";
      console.error(message);
    }
  },

  _onChange: function _onChange(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  },

  getSelectedValue: function getSelectedValue() {
    return this.state.selected;
  },

  setSelectedValue: function setSelectedValue(newSelectionValue) {
    this._updateRadioButtons(newSelectionValue);
  },

  clearValue: function clearValue() {
    this.setSelectedValue('');
  }

});

exports['default'] = RadioButtonGroup;
module.exports = exports['default'];