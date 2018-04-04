import React, { PureComponent } from 'react';
import './style.css';

export default class ReactionTime extends PureComponent {
  render() {
    return (
      <div className='rt-wrapper'>
          <h2> Reaction Time </h2>
          <h3> Instructions </h3>
          <Game />
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
      performanceTime: [],
      results: []
    }
  }

  componentDidMount() {
    this.randomlyChangeState();
  }

  markThisEvaluationComplete() {
    // store the result
    let x = this.state.performanceTime.pop();
    let y = this.state.performanceTime.pop();
    this.state.results.push((x-y));

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