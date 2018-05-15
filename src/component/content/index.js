
import './content.scss';
import React from 'react';
import RadioButton from '../Radio/index';
import { renderIf } from '../../lib/utils';
const Check = require('../../lib/check-winner');
import DisplayBox from '../displayBox/index';
import Modal from '../modal/index';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [['','',''],['','',''],['','','']],
      size: 3,
      user: true,
      count: 0,
      last: '',
      next: '',
      winner: false,
      stalemate: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckForWinner = this.handleCheckForWinner.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  handleReset() {
    if (this.state.size === 3) {
      this.setState({array: [['','',''],['','',''],['','','']], winner: false, stalemate: false, count: 0});
    } else {
      this.setState({array: [['','','',''],['','','',''],['','','',''],['','','','']], winner: false, stalemate: false, count: 0});
    }
  }

  handleMode(arr) {
    if (arr === 3) {
      this.setState({array: [['','',''],['','',''],['','','']],
        size: 3});
    }
    if (arr === 4) {
      this.setState({array: [['','','',''],['','','',''],['','','',''],['','','','']],
        size: 4});
    }
  }

  handleCheckForWinner() {
    let checkGame = Check.checkWinner(this.state.array);
    if (checkGame === 'winner') {
      this.setState({winner: true});
    } else if (this.state.count === (this.state.size * this.state.size) -1) {
      this.setState({stalemate: true});
    }
  }

  handleSubmit(e) {
    let countUp = this.state.count;

    if (this.state.user === true) {
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'X';
      this.setState({array: temp, user: false, last: 'X', next: 'O', count: countUp + 1});
      this.handleCheckForWinner();
    } else {
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'O';
      this.setState({array: temp, user: true, last: 'O', next: 'X', count: countUp + 1});
      this.handleCheckForWinner();
    }
  }

  render() {
    return (
      <div className="main">
        <header>Tic Tac Toe?</header>

        <div className="holder">
          <RadioButton
            className="radio"
            config={({
              name: 'group1',
              divName: 'radio-btn-div',
              labelName: 'radio-btn-label',
              id: 'radio-btn',
              item: 3,
            })}
            switchMode={this.handleMode}
          />
          <h3 className="mode">Original</h3>

          <RadioButton
            className="radio"
            config={({
              name: 'group1',
              divName: 'radio-btn-div',
              labelName: 'radio-btn-label',
              id: 'radio-btn2',
              item: 4,
            })}
            switchMode={this.handleMode}
          />

          <h3 className="mode">Insane</h3>

          <h2 className={this.state.last ? 'next' : 'wait'}>{this.state.next}, you are up!</h2>
        </div>

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
                boardSize={this.state.size}
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
