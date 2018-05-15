
// import './content.scss';
import React from 'react';
import { renderIf } from '../../lib/utils';
const Check = require('../../lib/check-winner');
import DisplayBox from '../displayBox/index';
import Modal from '../modal/index';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [['','',''],['','',''],['','','']],
      user: true,
      count: 0,
      last: '',
      winner: false,
      stalemate: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckForWinner = this.handleCheckForWinner.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidUpdate() {
    console.log('update', this.state);
  }

  handleReset() {
    console.log('i was clicked');
    this.setState({array: [['','',''],['','',''],['','','']], winner: false, count: 0});
  }

  handleCheckForWinner() {
    console.log('test');
    let checkGame = Check.checkWinner(this.state.array);
    if (checkGame === 'winner') {
      this.setState({winner: true});
    }

    if (this.state.count > 8) {
      console.log('am over 8');
      this.setState({stalemate: true});
    }
  }

  handleSubmit(e) {
    let countUp = this.state.count;

    if (this.state.user === true) {
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'X';
      this.setState({array: temp, user: false, last: 'X', count: countUp + 1});
      this.handleCheckForWinner();
    } else {
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'O';
      this.setState({array: temp, user: true, last: 'O', count: countUp + 1});
      this.handleCheckForWinner();
    }
  }

  render() {
    return (
      <div className="main">
        <header>Tic Tac Toe?</header>

        {renderIf(this.state.winner === true,
          <Modal
            reset={this.handleReset}
            saying='congrants, you win!'
            winner={this.state.last}
          />
        )}

        {renderIf(this.state.stalemate === true,
          <Modal
            reset={this.handleReset}
            saying='its a stalemate'
          />
        )}

        <div className="boxes">
          {this.state.array.map((item, arr) => {
            return item.map((item, idx) => {
              return <DisplayBox key={idx}
                boxLocation={{arr,idx}}
                value={this.state.array[arr][idx]}
                onPicking={this.handleSubmit}
              />;
            });
          })
          }
        </div>

      </div>
    );
  }
}

export default Content;
