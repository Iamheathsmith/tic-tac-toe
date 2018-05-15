import React from 'react';
import './radio.scss';

class RadioButton extends React.Component {
  render() {
    return (
      <div className={this.props.config.divName}>
        <input
          type='radio'
          id={this.props.config.id}
          value={this.props.config.item}
          name='radio'
          onChange={() => this.props.switchMode(this.props.config.item)} />

        <label
          htmlFor={this.props.config.id}
          className={this.props.config.labelName} />

      </div>
    );
  }
}

export default RadioButton;
