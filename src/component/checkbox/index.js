import './check-box.scss';

import React from 'react';

class Checkbox extends React.Component {
  render() {
    return (
      <div className={this.props.config.divName}>
        <input
          type='checkbox'
          name={this.props.config.name}
          id={this.props.config.id}
          defaultChecked={false}
          onClick={this.props.cpuMode}/>

        <label htmlFor={this.props.config.id} className={this.props.config.labelName} />

      </div>
    );
  }
}

export default Checkbox;
