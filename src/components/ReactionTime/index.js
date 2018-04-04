import React, { PureComponent } from 'react';
import Table from '../Table';
import './style.css';

export default class ReactionTime extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      results: []
    }
  }

  updateResults = (score) => {
    let updatedResults = this.state.results.map((v) => v);
    updatedResults.push(score);
    this.setState({ results: updatedResults });
  }

  render() {
    return (
      <div className='rtPage'>

        {/* Game Area */}
        <div className='gameArea'>
          <div className='rt-wrapper'>
              <div>
                <h1><u> Reaction Time </u></h1>
                <h3> A game to test reaction time of your Brain </h3>
              </div>
              <div>
                <h2> Instructions </h2>
                <ul>
                  <li> Click the box as soon as it turns PINK </li>
                  <li> Repeat for 5 times </li>
                  <li> Finally, your median score will be visible on screen </li>
                </ul>
              </div>  
              <Game updateResults={this.updateResults} />
          </div>
        </div>

        {/* Scoreboard Area */}
        <div className='scoreArea'>
          <h1> Scoreboard Area of game </h1>
          <Table data={this.state.results}/>
        </div>
      </div>
    );
  }
}


class Game extends PureComponent {

  constructor() {
    super();
    this.state = {
      boxState: 'wait',
      evaluationsDone: 0,
      performanceTime: []
    }
  }

  componentDidMount() {
    this.randomlyChangeState();
  }

  markThisEvaluationComplete() {
    // store the result
    let x = this.state.performanceTime.pop();
    let y = this.state.performanceTime.pop();
    this.props.updateResults([`Attempt ${this.state.evaluationsDone + 1} : `,  Math.floor(x-y)]);

    // increment the counter, reset to wait state
    this.setState({ 
      evaluationsDone: this.state.evaluationsDone + 1 , 
      boxState: this.toggleState(this.state.boxState)
    });
    
    // change state again
    if (this.state.evaluationsDone < 5)
      this.randomlyChangeState();
  }

  randomlyChangeState() {
    return new Promise((resolve, reject) => {
      let x = Math.random();
      let smallRandomNumber = ( x *  1523879 ) % 8000;
  
      setTimeout( () => {
        this.setState( (state) => (
          { boxState: this.toggleState(this.state.boxState) }
        ))
        resolve();
      }, smallRandomNumber);
    })

  }

  toggleState(boxState) {
    return boxState === 'wait' ? 'click' : 'wait';
  }

  markReaction = () => {
    if (this.state.boxState === 'wait') return;

    //
    this.state.performanceTime.push(performance.now());
    this.markThisEvaluationComplete();

  }

  render() {
    if (this.state.boxState !== 'wait') {
      this.state.performanceTime.push(performance.now());
    }

    return(
      <div
        className = 'gameBox'
        onClick={this.markReaction}
        style={{
          backgroundColor: this.state.boxState === 'wait' ? 'lightyellow' : 'deeppink'
      }}>
        {this.state.boxState === 'wait' ? 'Wait' : 'Click'}
      </div>
    )
  }

}