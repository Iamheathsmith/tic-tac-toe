import React from 'react';

class Modal extends React.Component {

  render() {
    return (
      <section className="modal">
        <h3>{this.props.winner}{this.props.saying}</h3>
        <button className="btn" onClick={this.props.reset}> Play Again? </button>
      </section>
    );
  }
}

export default Modal;
