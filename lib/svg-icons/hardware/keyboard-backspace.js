'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _svgIcon = require('../../svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

var HardwareKeyboardBackspace = _react2['default'].createClass({
  displayName: 'HardwareKeyboardBackspace',

  mixins: [_reactAddonsPureRenderMixin2['default']],

  render: function render() {
    return _react2['default'].createElement(
      _svgIcon2['default'],
      this.props,
      _react2['default'].createElement('path', { d: 'M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z' })
    );
  }

});

exports['default'] = HardwareKeyboardBackspace;
module.exports = exports['default'];