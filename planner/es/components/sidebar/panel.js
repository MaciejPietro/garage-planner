var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

var STYLE = {
  // borderTop: '1px solid #222',
  // borderBottom: '1px solid #48494E',
  userSelect: 'none'
};
var STYLE_TITLE = {
  fontSize: '1px',
  color: SharedStyle.PRIMARY_COLOR.text_alt,
  padding: '5px 15px 8px 15px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.alt,
  textShadow: '-1px -1px 2px rgba(0, 0, 0, 1)',
  boxShadow: 'inset 0px -3px 19px 0px rgba(0,0,0,0.5)',
  margin: '0px',
  cursor: 'pointer'
};
var STYLE_CONTENT = {
  fontSize: '10px',
  color: SharedStyle.PRIMARY_COLOR.text_main,
  borderWidth: '1px',
  borderColor: SharedStyle.COLORS.white,
  borderStyle: 'solid',
  borderRadius: '7px',
  background: SharedStyle.COLORS.lighter_blue,
  padding: '0px'
};
var STYLE_ARROW = {
  float: 'right'
};

var Panel = function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props, context) {
    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, props, context));

    _this.state = {
      opened: props.hasOwnProperty('opened') ? props.opened : false,
      hover: false
    };
    return _this;
  }

  _createClass(Panel, [{
    key: 'toggleOpen',
    value: function toggleOpen() {
      this.setState({ opened: !this.state.opened });
    }
  }, {
    key: 'toggleHover',
    value: function toggleHover() {
      this.setState({ hover: !this.state.hover });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          headComponents = _props.headComponents,
          children = _props.children;
      var _state = this.state,
          opened = _state.opened,
          hover = _state.hover;


      return React.createElement(
        'div',
        { style: STYLE },
        React.createElement(
          'div',
          { style: _extends({}, STYLE_CONTENT, { display: opened ? 'block' : 'none' }) },
          children
        )
      );
    }
  }]);

  return Panel;
}(Component);

export default Panel;


Panel.propTypes = {
  name: PropTypes.string.isRequired,
  headComponents: PropTypes.array,
  opened: PropTypes.bool
};