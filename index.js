"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var keyBoardNumberContext = (0, _react.createContext)();

var MobileNumberKeyboard =
/*#__PURE__*/
function (_Component) {
  _inherits(MobileNumberKeyboard, _Component);

  function MobileNumberKeyboard(props) {
    var _this;

    _classCallCheck(this, MobileNumberKeyboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MobileNumberKeyboard).call(this, props));
    var _this$props = _this.props,
        theme = _this$props.theme,
        _this$props$minus = _this$props.minus,
        minus = _this$props$minus === void 0 ? true : _this$props$minus,
        _this$props$float = _this$props.float,
        float = _this$props$float === void 0 ? true : _this$props$float;
    _this.theme = _this.getTheme(theme);
    _this.state = {
      caps: false,
      init: true,
      isMobile: 'ontouchstart' in document.documentElement ? true : false,
      row1: {
        index: '1',
        items: [{
          text: '1',
          width: '25%'
        }, {
          text: '2',
          width: '25%'
        }, {
          text: '3',
          width: '25%'
        }, {
          text: '0',
          width: '25%',
          id: 'key-0'
        }]
      },
      row2: {
        index: '2',
        items: [{
          text: '4',
          width: '25%'
        }, {
          text: '5',
          width: '25%'
        }, {
          text: '6',
          width: '25%'
        }, {
          text: '.',
          width: '25%',
          id: 'key-point',
          disabled: float === false
        }]
      },
      row3: {
        index: '3',
        items: [{
          text: '7',
          width: '25%'
        }, {
          text: '8',
          width: '25%'
        }, {
          text: '9',
          width: '25%'
        }, {
          text: '-/+',
          width: '25%',
          id: 'key-reverse',
          disabled: minus === false
        }]
      },
      row4: {
        index: '4',
        items: [{
          text: 'Del',
          width: '50%',
          id: 'key-back'
        }, {
          text: 'OK',
          width: '50%',
          id: 'key-ok'
        }]
      }
    };
    return _this;
  }

  _createClass(MobileNumberKeyboard, [{
    key: "getBack",
    value: function getBack(value) {
      if (value.length === 0) {
        return false;
      }

      return value.slice(0, value.length - 1);
    }
  }, {
    key: "ok",
    value: function ok() {
      var _this$props2 = this.props,
          close = _this$props2.close,
          fields = _this$props2.fields;

      if (this.props.callback) {
        var obj = {};

        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          var value = parseFloat(field.value);
          obj[field.field] = isNaN(value) ? 0 : value;
        }

        this.props.callback(obj);

        if (close) {
          this.close();
        }
      }
    }
  }, {
    key: "keyclick",
    value: function keyclick(item) {
      var id = item.id;

      if (item.disabled) {
        return;
      }

      if (id === 'key-ok') {
        this.ok();
        return;
      }

      if (id === 'key-close') {
        this.close();
        return;
      }

      var init = this.state.init;
      var activeField = this.getActiveField();
      var value = (activeField.value || '0').toString();

      if (id === 'key-reverse') {
        if (value[0] === '-') {
          activeField.value = value.slice(1, value.length);
        } else {
          activeField.value = '-' + value;
        }

        this.setState({});
        return;
      }

      if (init) {
        activeField.value = '';
        init = false;
      }

      var pointIndex = value.indexOf('.');
      var length = value.length; //var lastChar = length > 0?value[length - 1]:false;

      if (id === 'key-back') {
        if (length > 0) {
          activeField.value = activeField.value.slice(0, activeField.value.length - 1);
        }

        if (activeField.value === '') {
          activeField.value = '0';
        }
      } else if (id === 'key-point') {
        if (pointIndex !== -1 || length === 0 || value === '-') {
          return;
        }

        activeField.value += '.';
      } else if (id === 'key-minus') {
        if (activeField.value !== '' && activeField.value !== '0') {
          return;
        }

        activeField.value = '-';
      } else if (id === 'key-0') {
        if (activeField.value === '0' || activeField.value === '-0') {
          return;
        }

        activeField.value += '0';
      } else {
        if (activeField.value === '0') {
          activeField.value = '';
        } else if (activeField.value === '-0') {
          activeField.value = '-';
        }

        activeField.value += item.text;
      }

      this.setState({
        init: false
      });
    }
  }, {
    key: "getActiveField",
    value: function getActiveField() {
      var fields = this.props.fields;

      for (var i = 0; i < fields.length; i++) {
        if (fields[i].active) {
          return fields[i];
        }
      }
    }
  }, {
    key: "keydown",
    value: function keydown(e) {
      var isMobile = this.state.isMobile;
      (0, _jquery.default)(window).bind(isMobile ? 'touchend' : 'mouseup', _jquery.default.proxy(this.keyup, this));
      var theme = this.theme;
      var keyColor = theme.keyColor,
          keyBackground = theme.keyBackground;
      var key = (0, _jquery.default)(e.currentTarget).find('.keyboard-key');
      key.css({
        background: keyColor,
        color: keyBackground
      });
    }
  }, {
    key: "keyup",
    value: function keyup() {
      var isMobile = this.state.isMobile;
      var theme = this.theme;
      var keyColor = theme.keyColor,
          keyBackground = theme.keyBackground;
      (0, _jquery.default)(window).unbind(isMobile ? 'touchend' : 'mouseup', this.keyup);
      (0, _jquery.default)('.keyboard-key').css({
        background: keyBackground,
        color: keyColor
      });
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = this.props.style;
      var background = this.theme.background;
      return _jquery.default.extend({}, {
        background: background,
        width: '260px',
        left: 'calc(50% - 130px)',
        top: '100px'
      }, style);
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        init: true
      });
      this.props.onclose();
    }
  }, {
    key: "fieldMouseDown",
    value: function fieldMouseDown(index) {
      var init = this.state.init;
      var fields = this.props.fields;

      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];

        if (i === index) {
          if (field.active) {
            init = !init;
          } else {
            init = true;
            field.active = true;
          }
        } else {
          field.active = false;
        }
      }

      this.setState({
        init: init
      });
    }
  }, {
    key: "getTheme",
    value: function getTheme() {
      var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var def = {
        background: '#c9ced4',
        keyColor: '#28292b',
        activeFieldColor: '#1d5ee4',
        keyBackground: '#fff',
        titleColor: '#000',
        highlight: '#7fb9ef',
        keyBoxShadow: undefined
      };
      return _jquery.default.extend({}, def, theme);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          caps = _this$state.caps,
          value = _this$state.value,
          sym = _this$state.sym,
          init = _this$state.init,
          isMobile = _this$state.isMobile;
      var _this$props3 = this.props,
          open = _this$props3.open,
          fields = _this$props3.fields;

      if (!open) {
        return '';
      }

      var _this$props4 = this.props,
          _this$props4$title = _this$props4.title,
          title = _this$props4$title === void 0 ? '' : _this$props4$title,
          _this$props4$keyHeigh = _this$props4.keyHeight,
          keyHeight = _this$props4$keyHeigh === void 0 ? 36 : _this$props4$keyHeigh,
          _this$props4$gap = _this$props4.gap,
          gap = _this$props4$gap === void 0 ? 2 : _this$props4$gap;
      var contextValue = {
        caps: caps,
        sym: sym,
        keyclick: this.keyclick.bind(this),
        keydown: this.keydown.bind(this),
        value: value,
        init: init,
        theme: this.theme,
        title: title,
        keyHeight: keyHeight,
        gap: gap,
        fields: fields,
        fieldMouseDown: this.fieldMouseDown.bind(this),
        isMobile: isMobile
      };

      var backDropProps = _defineProperty({
        className: 'back-drop'
      }, isMobile ? 'onTouchStart' : 'onMouseDown', this.close.bind(this));

      var Fields = fields.map(function (field, i) {
        return _react.default.createElement(KeyboardField, {
          key: i,
          index: i
        });
      });
      return _react.default.createElement(keyBoardNumberContext.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        className: "number-keyboard" + (caps ? ' caps' : ''),
        style: this.getStyle()
      }, _react.default.createElement("div", backDropProps), _react.default.createElement(KeyboardHeader, null), _react.default.createElement(KeyboardRow, {
        row: this.state.row1
      }), _react.default.createElement(KeyboardRow, {
        row: this.state.row2
      }), _react.default.createElement(KeyboardRow, {
        row: this.state.row3
      }), _react.default.createElement(KeyboardRow, {
        row: this.state.row4
      }), Fields));
    }
  }]);

  return MobileNumberKeyboard;
}(_react.Component);

exports.default = MobileNumberKeyboard;
MobileNumberKeyboard.defaultProps = {
  fields: []
};

var KeyboardRow =
/*#__PURE__*/
function (_Component2) {
  _inherits(KeyboardRow, _Component2);

  function KeyboardRow() {
    _classCallCheck(this, KeyboardRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardRow).apply(this, arguments));
  }

  _createClass(KeyboardRow, [{
    key: "render",
    value: function render() {
      var row = this.props.row;
      var keys = row.items.map(function (item, i) {
        return _react.default.createElement(KeyboardKey, {
          key: row.index + i,
          item: item
        });
      });
      return _react.default.createElement("div", {
        className: "keyboard-row"
      }, keys);
    }
  }]);

  return KeyboardRow;
}(_react.Component);

_defineProperty(KeyboardRow, "contextType", keyBoardNumberContext);

var KeyboardKey =
/*#__PURE__*/
function (_Component3) {
  _inherits(KeyboardKey, _Component3);

  function KeyboardKey() {
    _classCallCheck(this, KeyboardKey);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardKey).apply(this, arguments));
  }

  _createClass(KeyboardKey, [{
    key: "getColor",
    value: function getColor() {
      var _this$context = this.context,
          caps = _this$context.caps,
          sym = _this$context.sym,
          theme = _this$context.theme;
      var keyColor = theme.keyColor,
          activeFieldColor = theme.activeFieldColor;
      var item = this.props.item;

      if (item.id === 'key-caps') {
        return caps ? activeFieldColor : keyColor;
      } else if (item.id === 'sym') {
        return sym ? activeFieldColor : keyColor;
      } else {
        return keyColor;
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle(style) {
      var _this$context2 = this.context,
          keyHeight = _this$context2.keyHeight,
          gap = _this$context2.gap;
      var item = this.props.item;
      return _jquery.default.extend({}, {
        height: keyHeight + 'px',
        lineHeight: keyHeight - 2 * gap + 'px',
        width: item.width,
        marginLeft: item.marginLeft,
        padding: gap + 'px',
        opacity: item.disabled ? 0.3 : 1
      }, style);
    }
  }, {
    key: "getKeyStyle",
    value: function getKeyStyle(mode) {
      var theme = this.context.theme;
      var keyBackground = theme.keyBackground,
          keyColor = theme.keyColor,
          keyBoxShadow = theme.keyBoxShadow;
      return {
        color: mode === 'shadow' ? keyBackground : this.getColor(),
        background: mode === 'shadow' ? keyColor : keyBackground,
        boxShadow: keyBoxShadow
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          item = _this$props5.item,
          style = _this$props5.style;
      var _this$context3 = this.context,
          keyclick = _this$context3.keyclick,
          isMobile = _this$context3.isMobile,
          keydown = _this$context3.keydown;

      var containerProps = _defineProperty({
        className: "key-container",
        style: this.getStyle(style),
        onClick: item.disabled ? undefined : function () {
          return keyclick(item);
        }
      }, isMobile ? 'onTouchStart' : 'onMouseDown', item.disabled ? undefined : keydown);

      var keyProps = {
        className: item.className + ' keyboard-key',
        id: item.id,
        style: this.getKeyStyle()
      };
      return _react.default.createElement("div", containerProps, _react.default.createElement("div", keyProps, item.text));
    }
  }]);

  return KeyboardKey;
}(_react.Component);

_defineProperty(KeyboardKey, "contextType", keyBoardNumberContext);

var KeyboardHeader =
/*#__PURE__*/
function (_Component4) {
  _inherits(KeyboardHeader, _Component4);

  function KeyboardHeader() {
    _classCallCheck(this, KeyboardHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardHeader).apply(this, arguments));
  }

  _createClass(KeyboardHeader, [{
    key: "getLCDStyle",
    value: function getLCDStyle() {
      var _this$context4 = this.context,
          theme = _this$context4.theme,
          keyHeight = _this$context4.keyHeight,
          gap = _this$context4.gap;
      var lcdBackground = theme.lcdBackground;
      return {
        background: lcdBackground,
        minHeight: keyHeight - 2 * gap + 'px',
        maxHeight: keyHeight * 3 + 'px',
        lineHeight: keyHeight - 2 * gap + 'px',
        width: "calc(100% - 54px - ".concat(gap, "px)"),
        marginLeft: gap + 'px',
        marginTop: gap + 'px'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var gap = this.context.gap;
      return _react.default.createElement("div", {
        className: "keyboard-header"
      }, _react.default.createElement(KeyboardKey, {
        item: {
          text: 'Close',
          id: 'key-close',
          width: '50px'
        },
        style: {
          float: 'right',
          width: '60px',
          marginRight: gap + 'px'
        }
      }), _react.default.createElement(KeyboardTitle, null));
    }
  }]);

  return KeyboardHeader;
}(_react.Component);

_defineProperty(KeyboardHeader, "contextType", keyBoardNumberContext);

var KeyboardTitle =
/*#__PURE__*/
function (_Component5) {
  _inherits(KeyboardTitle, _Component5);

  function KeyboardTitle() {
    _classCallCheck(this, KeyboardTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardTitle).apply(this, arguments));
  }

  _createClass(KeyboardTitle, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context5 = this.context,
          keyHeight = _this$context5.keyHeight,
          theme = _this$context5.theme,
          gap = _this$context5.gap;
      var titleColor = theme.titleColor;
      return {
        height: keyHeight + 'px',
        lineHeight: keyHeight + 'px',
        color: titleColor,
        padding: "0 ".concat(gap, "px"),
        boxSizing: 'border-box',
        //background:'yellow',
        width: "calc(100% - 68px - ".concat(gap, "px)")
      };
    }
  }, {
    key: "render",
    value: function render() {
      var title = this.context.title;
      return _react.default.createElement("div", {
        className: "keyboard-title",
        style: this.getStyle()
      }, title);
    }
  }]);

  return KeyboardTitle;
}(_react.Component);

_defineProperty(KeyboardTitle, "contextType", keyBoardNumberContext);

var KeyboardField =
/*#__PURE__*/
function (_Component6) {
  _inherits(KeyboardField, _Component6);

  function KeyboardField() {
    _classCallCheck(this, KeyboardField);

    return _possibleConstructorReturn(this, _getPrototypeOf(KeyboardField).apply(this, arguments));
  }

  _createClass(KeyboardField, [{
    key: "getStyle",
    value: function getStyle(field) {
      var theme = this.context.theme;
      var titleColor = theme.titleColor,
          activeFieldColor = theme.activeFieldColor;
      return {
        color: titleColor,
        padding: '3px',
        width: '100%',
        float: 'left',
        borderRadius: '4px',
        position: 'relative',
        boxSizing: 'border-box',
        background: field.active ? activeFieldColor : undefined
      };
    }
  }, {
    key: "getBackground",
    value: function getBackground(highlight, active, init) {
      if (active && init) {
        return highlight;
      } else {
        return 'none';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index;
      var _this$context6 = this.context,
          fieldMouseDown = _this$context6.fieldMouseDown,
          theme = _this$context6.theme,
          init = _this$context6.init,
          fields = _this$context6.fields;
      var highlight = theme.highlight;
      var field = fields[index];
      return _react.default.createElement("div", {
        className: "keyboard-field",
        style: this.getStyle(field),
        onMouseDown: function onMouseDown() {
          return fieldMouseDown(index);
        }
      }, _react.default.createElement("div", {
        className: "keyboard-field-title"
      }, field.title), _react.default.createElement("div", {
        className: "keyboard-field-value",
        style: {
          background: '#000'
        }
      }, _react.default.createElement("mark", {
        style: {
          background: this.getBackground(highlight, field.active, init),
          color: '#fff'
        }
      }, field.value === undefined ? '0' : field.value)));
    }
  }]);

  return KeyboardField;
}(_react.Component);

_defineProperty(KeyboardField, "contextType", keyBoardNumberContext);