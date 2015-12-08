'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

var _stylesColors = require('../styles/colors');

var _stylesColors2 = _interopRequireDefault(_stylesColors);

var _stylesTransitions = require('../styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _transitionGroupsScaleIn = require('../transition-groups/scale-in');

var _transitionGroupsScaleIn2 = _interopRequireDefault(_transitionGroupsScaleIn);

var pulsateDuration = 750;

var FocusRipple = _react2['default'].createClass({
  displayName: 'FocusRipple',

  mixins: [_reactAddonsPureRenderMixin2['default'], _mixinsStylePropable2['default']],

  propTypes: {
    color: _react2['default'].PropTypes.string,
    innerStyle: _react2['default'].PropTypes.object,
    opacity: _react2['default'].PropTypes.number,
    show: _react2['default'].PropTypes.bool,
    style: _react2['default'].PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: _stylesColors2['default'].darkBlack
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    } else {
      if (this._timeout) clearTimeout(this._timeout);
    }
  },

  render: function render() {
    var _props = this.props;
    var show = _props.show;
    var style = _props.style;

    var mergedRootStyles = this.mergeStyles({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }, style);

    var ripple = show ? this._getRippleElement(this.props) : null;

    return _react2['default'].createElement(
      _transitionGroupsScaleIn2['default'],
      {
        maxScale: 0.85,
        style: mergedRootStyles },
      ripple
    );
  },

  _getRippleElement: function _getRippleElement(props) {
    var color = props.color;
    var innerStyle = props.innerStyle;
    var opacity = props.opacity;

    var innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: opacity ? opacity : 0.16,
      backgroundColor: color,
      transition: _stylesTransitions2['default'].easeOut(pulsateDuration + 'ms', 'transform', null, _stylesTransitions2['default'].easeInOutFunction)
    }, innerStyle);

    return _react2['default'].createElement('div', { ref: 'innerCircle', style: innerStyles });
  },

  _pulsate: function _pulsate() {
    if (!this.isMounted()) return;

    var innerCircle = _reactDom2['default'].findDOMNode(this.refs.innerCircle);
    if (!innerCircle) return;

    var startScale = 'scale(1)';
    var endScale = 'scale(0.85)';
    var currentScale = innerCircle.style.transform;
    var nextScale = undefined;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ? endScale : startScale;

    _stylesAutoPrefix2['default'].set(innerCircle.style, 'transform', nextScale);
    this._timeout = setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize: function _setRippleSize() {
    var el = _reactDom2['default'].findDOMNode(this.refs.innerCircle);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    var oldTop = 0;
    // For browsers that don't support endsWith()
    if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
      oldTop = parseInt(el.style.top);
    }
    el.style.height = size + 'px';
    el.style.top = height / 2 - size / 2 + oldTop + 'px';
  }

});

exports['default'] = FocusRipple;
module.exports = exports['default'];