
import './content.scss';
import React from 'react';
import Modal from '../modal/index';
const Bot= require('../../lib/bot');
import RadioButton from '../Radio/index';
import CheckBox from '../checkbox/index';
import { renderIf } from '../../lib/utils';
import DisplayBox from '../displayBox/index';
const Check = require('../../lib/check-winner');

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cpu: false,
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
    this.handleCpu = this.handleCpu.bind(this);
    this.handleCpuTurn = this.handleCpuTurn.bind(this);
  }

  handleReset() {
    if (this.state.size === 3) {
      this.setState({array: [['','',''],['','',''],['','','']], winner: false, stalemate: false, count: 0, user: true, last: '', next: ''});
    } else {
      this.setState({array: [['','','',''],['','','',''],['','','',''],['','','','']], winner: false, stalemate: false, count: 0, user: true, last: '', next: ''});
    }
  }

  handleMode(arr) {
    if (arr === 3) {
      this.setState({array: [['','',''],['','',''],['','','']],
        size: 3, user: true, last: '', next: ''});
    }
    if (arr === 4) {
      this.setState({array: [['','','',''],['','','',''],['','','',''],['','','','']],
        size: 4, user: true, last: '', next: ''});
    }
  }

  handleCpu() {
    this.setState({cpu: !this.state.cpu});
  }

  handleCpuTurn() {
    let countUp = this.state.count;
    if (countUp === (this.state.size * this.state.size)) return;
    let nextMove = Bot.nextMove(this.state.array);
    let temp = this.state.array;
    temp[nextMove.i][nextMove.y] = 'O';
    this.setState({array: temp, user: true, last: 'O', next: 'X', count: countUp + 1});
    this.handleCheckForWinner();
    console.log('cpu', this.state.count);
  }

  handleCheckForWinner() {
    console.log('inside check winner');
    let checkGame = Check.checkWinner(this.state.array);
    if (checkGame === 'winner') {
      this.setState({winner: true});
      return;
    } else if (this.state.count === (this.state.size * this.state.size)) {
      this.setState({stalemate: true});
      return;
    }
  }

  handleSubmit(e) {
    let countUp = this.state.count;

    if (this.state.user === true) {
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'X';
      return Promise.resolve(this.setState({array: temp, user: false, last: 'X', next: 'O', count: countUp + 1}))
        .then(() => {
          console.log('inside the check winner in .then');
          this.handleCheckForWinner()
          ;})
        .then(() => {
          if (this.state.cpu === true && this.state.winner === false) {
            this.handleCpuTurn();
          }
        });
    }

    if (this.state.user === false && this.state.cpu === false){
      let temp = this.state.array;
      temp[e.location.arr][e.location.idx] = 'O';
      this.setState({array: temp, user: true, last: 'O', next: 'X', count: countUp + 1});
      this.handleCheckForWinner();
      return;
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

          <div className="cpu-box">
            <CheckBox
              config={({
                divName: 'checkbox-div',
                labelName: 'checkbox-label',
                id: 'check-box',
                name: 'checkbox',
              })}
              cpuMode={this.handleCpu}
            />
            <h2 className="cpu-mode">Play against CPU?</h2>
          </div>

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
