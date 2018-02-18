import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles.css';
import './App.css';
import _ from 'lodash/lodash.js';

const Stars = (props) => {
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map((number, index) =>
        <i key={index} className="fa fa-star"></i>)}
    </div>
  );
}

const Button = (props) => {
  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = <button className="btn btn-success"
        onClick={props.acceptAnswer}>
        <i className="fa fa-check"></i>
      </button>;
      break;
    case false:
      button = <button className="btn btn-danger">
        <i className="fa fa-times"></i>
      </button>;
      break;
    default:
      button = <button className="btn"
        disabled={props.selectedNumbers.length === 0}
        onClick={props.checkAnswer}>=</button>
      break;
  }

  return (
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm"
        disabled={props.redraws === 0}
        onClick={props.redraw}>
        <i className="fa fa-refresh">{props.redraws}</i>
      </button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, index) =>
        <span key={index}
          onClick={() => props.deselectNumber(number)}>{number}</span>
      )}
    </div>
  );
}

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, index) =>
          <span key={index} className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}>{number}</span>
        )}
      </div>
    </div>
  );
}

Numbers.list = _.range(1, 10);

class Game extends Component {
  static randomNumber = () => Math.floor(Math.random() * 9) + 1;
  state = {
    selectedNumbers: [],
    usedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    redraws: 5
  }

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0 &&
      this.state.usedNumbers.indexOf(clickedNumber) < 0) {
      this.setState(prevState => ({
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
        answerIsCorrect: null
      }));
    }
  }

  deselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
      answerIsCorrect: null
    }));
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.numberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber()
    }));
  }

  redraw = () => {
    if (this.state.redraws === 0) { return; }
    this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
      redraws: prevState.redraws - 1
    }));
  }

  render() {
    const {
      numberOfStars,
      selectedNumbers,
      usedNumbers,
      answerIsCorrect,
      redraws
    } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            selectedNumbers={selectedNumbers}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws} />
          <Answer
            deselectNumber={this.deselectNumber}
            selectedNumbers={selectedNumbers} />
        </div>
        <br />
        <Numbers
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}
          selectedNumbers={selectedNumbers} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (<div>
      <Game />
    </div>);
  }
}

export default App;
