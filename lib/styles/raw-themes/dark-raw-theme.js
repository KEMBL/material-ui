'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _colors = require('../colors');

var _colors2 = _interopRequireDefault(_colors);

var _utilsColorManipulator = require('../../utils/color-manipulator');

var _utilsColorManipulator2 = _interopRequireDefault(_utilsColorManipulator);

var _spacing = require('../spacing');

var _spacing2 = _interopRequireDefault(_spacing);

exports['default'] = {
  spacing: _spacing2['default'],
  fontFamily: 'Roboto, sans-serif',
  zIndex: {
    layer: 20,
    popover: 20
  },
  palette: {
    primary1Color: _colors2['default'].cyan700,
    primary2Color: _colors2['default'].cyan700,
    primary3Color: _colors2['default'].grey600,
    accent1Color: _colors2['default'].pinkA200,
    accent2Color: _colors2['default'].pinkA400,
    accent3Color: _colors2['default'].pinkA100,
    textColor: _colors2['default'].fullWhite,
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: _utilsColorManipulator2['default'].fade(_colors2['default'].fullWhite, 0.3),
    disabledColor: _utilsColorManipulator2['default'].fade(_colors2['default'].fullWhite, 0.3),
    pickerHeaderColor: _utilsColorManipulator2['default'].fade(_colors2['default'].fullWhite, 0.12),
    clockCircleColor: _utilsColorManipulator2['default'].fade(_colors2['default'].fullWhite, 0.12)
  }
};
module.exports = exports['default'];