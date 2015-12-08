'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mixinsStylePropable = require('./mixins/style-propable');

var _mixinsStylePropable2 = _interopRequireDefault(_mixinsStylePropable);

var _stylesAutoPrefix = require('./styles/auto-prefix');

var _stylesAutoPrefix2 = _interopRequireDefault(_stylesAutoPrefix);

var _stylesTransitions = require('./styles/transitions');

var _stylesTransitions2 = _interopRequireDefault(_stylesTransitions);

var _paper = require('./paper');

var _paper2 = _interopRequireDefault(_paper);

var _stylesRawThemesLightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _stylesRawThemesLightRawTheme2 = _interopRequireDefault(_stylesRawThemesLightRawTheme);

var _stylesThemeManager = require('./styles/theme-manager');

var _stylesThemeManager2 = _interopRequireDefault(_stylesThemeManager);

var VIEWBOX_SIZE = 32;
var RefreshIndicator = _react2['default'].createClass({
  displayName: 'RefreshIndicator',

  mixins: [_mixinsStylePropable2['default']],

  contextTypes: {
    muiTheme: _react2['default'].PropTypes.object
  },

  propTypes: {
    color: _react2['default'].PropTypes.string,
    left: _react2['default'].PropTypes.number.isRequired,
    loadingColor: _react2['default'].PropTypes.string,
    percentage: _react2['default'].PropTypes.number,
    size: _react2['default'].PropTypes.number,
    status: _react2['default'].PropTypes.oneOf(['ready', 'loading', 'hide']),
    style: _react2['default'].PropTypes.object,
    top: _react2['default'].PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      percentage: 0,
      size: 40,
      status: 'hide'
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _stylesThemeManager2['default'].getMuiTheme(_stylesRawThemesLightRawTheme2['default'])
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  componentDidMount: function componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._scalePath(_reactDom2['default'].findDOMNode(this.refs.path), 0);
    this._rotateWrapper(_reactDom2['default'].findDOMNode(this.refs.wrapper));
  },

  render: function render() {
    var rootStyle = this._getRootStyle();
    return _react2['default'].createElement(
      _paper2['default'],
      {
        circle: true,
        style: this.mergeStyles(rootStyle, this.props.style),
        ref: 'indicatorCt'
      },
      this._renderChildren()
    );
  },

  _renderChildren: function _renderChildren() {
    var paperSize = this._getPaperSize();
    var childrenCmp = null;
    if (this.props.status !== 'ready') {
      var circleStyle = this._getCircleStyle(paperSize);
      childrenCmp = _react2['default'].createElement(
        'div',
        { ref: 'wrapper', style: this.prepareStyles({
            transition: _stylesTransitions2['default'].create('transform', '20s', null, 'linear'),
            width: '100%',
            height: '100%'
          })
        },
        _react2['default'].createElement(
          'svg',
          { style: {
              width: paperSize,
              height: paperSize
            },
            viewBox: '0 0 ' + VIEWBOX_SIZE + ' ' + VIEWBOX_SIZE
          },
          _react2['default'].createElement('circle', _extends({ ref: 'path',
            style: this.prepareStyles(circleStyle.style, {
              transition: _stylesTransitions2['default'].create('all', '1.5s', null, 'ease-in-out')
            })
          }, circleStyle.attr))
        )
      );
    } else {
      var circleStyle = this._getCircleStyle(paperSize);
      var polygonStyle = this._getPolygonStyle(paperSize);
      childrenCmp = _react2['default'].createElement(
        'svg',
        { style: {
            width: paperSize,
            height: paperSize
          },
          viewBox: '0 0 ' + VIEWBOX_SIZE + ' ' + VIEWBOX_SIZE
        },
        _react2['default'].createElement('circle', _extends({
          style: this.prepareStyles(circleStyle.style)
        }, circleStyle.attr)),
        _react2['default'].createElement('polygon', _extends({
          style: this.prepareStyles(polygonStyle.style)
        }, polygonStyle.attr))
      );
    }

    return childrenCmp;
  },

  _getTheme: function _getTheme() {
    return this.state.muiTheme.refreshIndicator;
  },

  _getPaddingSize: function _getPaddingSize() {
    var padding = this.props.size * 0.1;
    return padding;
  },

  _getPaperSize: function _getPaperSize() {
    return this.props.size - this._getPaddingSize() * 2;
  },

  _getCircleAttr: function _getCircleAttr() {
    return {
      radiu: VIEWBOX_SIZE / 2 - 5,
      originX: VIEWBOX_SIZE / 2,
      originY: VIEWBOX_SIZE / 2,
      strokeWidth: 3
    };
  },

  _getArcDeg: function _getArcDeg() {
    var p = this.props.percentage / 100;

    var beginDeg = p * 120;
    var endDeg = p * 410;
    return [beginDeg, endDeg];
  },

  _getFactor: function _getFactor() {
    var p = this.props.percentage / 100;
    var p1 = Math.min(1, p / 0.4);

    return p1;
  },

  _getRootStyle: function _getRootStyle() {
    var padding = this._getPaddingSize();
    return {
      position: 'absolute',
      zIndex: 2,
      width: this.props.size,
      height: this.props.size,
      padding: padding,
      top: -10000,
      left: -10000,
      transform: 'translate3d(' + (10000 + this.props.left) + 'px, ' + (10000 + this.props.top) + 'px, 0)',
      opacity: this.props.status === 'hide' ? 0 : 1,
      transition: this.props.status === 'hide' ? _stylesTransitions2['default'].create('all', '.3s', 'ease-out') : 'none'
    };
  },

  _getCircleStyle: function _getCircleStyle() {
    var isLoading = this.props.status === 'loading';
    var p1 = isLoading ? 1 : this._getFactor();
    var circle = this._getCircleAttr();
    var perimeter = Math.PI * 2 * circle.radiu;

    var _getArcDeg2 = this._getArcDeg();

    var _getArcDeg22 = _slicedToArray(_getArcDeg2, 2);

    var beginDeg = _getArcDeg22[0];
    var endDeg = _getArcDeg22[1];

    var arcLen = (endDeg - beginDeg) * perimeter / 360;
    var dashOffset = -beginDeg * perimeter / 360;

    var theme = this._getTheme();
    return {
      style: {
        strokeDasharray: arcLen + ', ' + (perimeter - arcLen),
        strokeDashoffset: dashOffset,
        stroke: isLoading || this.props.percentage === 100 ? this.props.loadingColor || theme.loadingStrokeColor : this.props.color || theme.strokeColor,
        strokeLinecap: 'round',
        opacity: p1,
        strokeWidth: circle.strokeWidth * p1,
        fill: 'none'
      },
      attr: {
        cx: circle.originX,
        cy: circle.originY,
        r: circle.radiu
      }
    };
  },

  _getPolygonStyle: function _getPolygonStyle() {
    var p1 = this._getFactor();
    var circle = this._getCircleAttr();

    var triangleCx = circle.originX + circle.radiu;
    var triangleCy = circle.originY;
    var dx = circle.strokeWidth * 7 / 4 * p1;
    var trianglePath = triangleCx - dx + ',' + triangleCy + ' ' + (triangleCx + dx) + ',' + triangleCy + ' ' + triangleCx + ',' + (triangleCy + dx);

    var _getArcDeg3 = this._getArcDeg();

    var _getArcDeg32 = _slicedToArray(_getArcDeg3, 2);

    var endDeg = _getArcDeg32[1];

    var theme = this._getTheme();
    return {
      style: {
        fill: this.props.percentage === 100 ? this.props.loadingColor || theme.loadingStrokeColor : this.props.color || theme.strokeColor,
        transform: 'rotate(' + endDeg + 'deg)',
        transformOrigin: circle.originX + 'px ' + circle.originY + 'px',
        opacity: p1
      },
      attr: {
        points: trianglePath
      }
    };
  },

  _scalePath: function _scalePath(path, step) {
    if (this.props.status !== 'loading' || !this.isMounted()) return;

    var currStep = (step || 0) % 3;

    clearTimeout(this._timer1);
    this._timer1 = setTimeout(this._scalePath.bind(this, path, currStep + 1), currStep ? 750 : 250);

    var circle = this._getCircleAttr();
    var perimeter = Math.PI * 2 * circle.radiu;
    var arcLen = perimeter * 0.64;

    var strokeDasharray = undefined,
        strokeDashoffset = undefined,
        transitionDuration = undefined;
    if (currStep === 0) {
      strokeDasharray = '1, 200';
      strokeDashoffset = 0;
      transitionDuration = '0ms';
    } else if (currStep === 1) {
      strokeDasharray = arcLen + ', 200';
      strokeDashoffset = -15;
      transitionDuration = '750ms';
    } else {
      strokeDasharray = arcLen + ',200';
      strokeDashoffset = -(perimeter - 1);
      transitionDuration = '850ms';
    }

    _stylesAutoPrefix2['default'].set(path.style, 'strokeDasharray', strokeDasharray);
    _stylesAutoPrefix2['default'].set(path.style, 'strokeDashoffset', strokeDashoffset);
    _stylesAutoPrefix2['default'].set(path.style, 'transitionDuration', transitionDuration);
  },

  _rotateWrapper: function _rotateWrapper(wrapper) {
    var _this = this;

    if (this.props.status !== 'loading' || !this.isMounted()) return;

    clearTimeout(this._timer2);
    this._timer2 = setTimeout(this._rotateWrapper.bind(this, wrapper), 10050);

    _stylesAutoPrefix2['default'].set(wrapper.style, 'transform', null);
    _stylesAutoPrefix2['default'].set(wrapper.style, 'transform', 'rotate(0deg)');
    _stylesAutoPrefix2['default'].set(wrapper.style, 'transitionDuration', '0ms');

    setTimeout(function () {
      if (_this.isMounted()) {
        _stylesAutoPrefix2['default'].set(wrapper.style, 'transform', 'rotate(1800deg)');
        _stylesAutoPrefix2['default'].set(wrapper.style, 'transitionDuration', '10s');
        _stylesAutoPrefix2['default'].set(wrapper.style, 'transitionTimingFunction', 'linear');
      }
    }, 50);
  },

  prefixed: function prefixed(key) {
    return _stylesAutoPrefix2['default'].single(key);
  }

});

exports['default'] = RefreshIndicator;
module.exports = exports['default'];