import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles.css';
import './App.css';
import _ from 'lodash/lodash.js';

const Stars = (props) => {
  const numberOfStars = Math.floor(Math.random()*9) + 1;
  let stars=[];
  for(let i=0; i< numberOfStars; i++){
   stars.push(<i key={i} className="fa fa-star"></i>);
  }

  return (
    <div className="col-5">
      {stars}
    </div>
  );
}

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
}

const Answer = (props) => {
  return (
    <div className="col-5">
      ...
    </div>
  );
}

const Numbers = (props) => {
  const arrayOfNumbers = _.range(1,10);
  return (
    <div className="card text-center">
      <div>
        {arrayOfNumbers.map((number,index)=>{
          <span key={index}>{number}</span>
        })}
      </div>
    </div>
  );
}

class Game extends Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer />
        </div>
        <br />
        <Numbers />
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
