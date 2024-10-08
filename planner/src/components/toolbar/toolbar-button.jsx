import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

//http://www.cssportal.com/css-tooltip-generator/

const STYLE = {
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '5px',
  fontSize: '20px',
  position: 'relative',
  cursor: 'pointer',
  borderWidth: '1px',
  borderColor: SharedStyle.COLORS.white,
  borderStyle: 'solid',
  borderRadius: '7px',
  background: SharedStyle.COLORS.lighter_blue,
};

const STYLE_TOOLTIP = {
  position: 'absolute',
  width: '140px',
  color: SharedStyle.COLORS.white,
  background: SharedStyle.COLORS.black,
  height: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  visibility: 'visible',
  borderRadius: '6px',
  opacity: '0.8',
  left: '100%',
  top: '50%',
  marginTop: '-15px',
  marginLeft: '15px',
  zIndex: '999',
  fontSize: '12px'
};

const STYLE_TOOLTIP_PIN = {
  position: 'absolute',
  top: '50%',
  right: '100%',
  marginTop: '-8px',
  width: '0',
  height: '0',
  borderRight: '8px solid #000000',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
};


export default class ToolbarButton extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { active: false };
  }

  render() {
    let { state, props } = this;
    let color = props.active || state.active ? SharedStyle.COLORS.dark : SharedStyle.COLORS.medium_blue;

    return (
      <div style={STYLE}
          onMouseOver={event => this.setState({ active: true })}
          onMouseOut={event => this.setState({ active: false })}
           onClick={props.onClick}
      >
        <div style={{ color }} >
          {props.children}
        </div>

        {
          state.active ?
          <div style={STYLE_TOOLTIP}>
            <span style={STYLE_TOOLTIP_PIN} />
            {props.tooltip}
          </div>
          : null
        }

      </div>
    )
  }
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
