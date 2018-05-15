import React from 'react';
import './modal.scss';

class Modal extends React.Component {

  render() {
    return (
      <div className="invis">
        <section className="modal">
          <h3>{this.props.winner}</h3>
          <h3>{this.props.saying}</h3>
          <button className="btn" onClick={this.props.reset}> Play Again? </button>
        </section>
      </div>
    );
  }
}

export default Modal;
