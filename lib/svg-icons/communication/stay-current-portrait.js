'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _svgIcon = require('../../svg-icon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommunicationStayCurrentPortrait = function CommunicationStayCurrentPortrait(props) {
  return _react2.default.createElement(
    _svgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z' })
  );
};
CommunicationStayCurrentPortrait = (0, _pure2.default)(CommunicationStayCurrentPortrait);
CommunicationStayCurrentPortrait.displayName = 'CommunicationStayCurrentPortrait';

exports.default = CommunicationStayCurrentPortrait;
module.exports = exports['default'];