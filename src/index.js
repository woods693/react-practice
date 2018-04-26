import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
        return (
            // props.onClick passes function down and onClick() calls it
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}


function findingWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],  
    ];
    
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a]
    }
    return false
    
}
    

class Board extends React.Component {
  
  renderSquare(i) {
    return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
    );
  }
  

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      history: [{
        squares: Array(9).fill(null),
        
      }],
      xIsNext: true,
      win: false,
      step: 0
    }
  }
  
  reset(){
      this.setState({
        history: [{
          squares: Array(9).fill(null),
          
        }],
        xIsNext: true,
        win: false
      })
  }
  
  
  handleClick(i){
      //to maintain immutable code, slice is called to make a copy
      const history = this.state.history.slice(0, this.state.step + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
          
    
      //if false => O
      if (!squares[i] && !this.state.win){  
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          
          const winner = findingWinner(squares);  
          
          this.setState({
            history: history.concat({squares}),
              //flips bool
            xIsNext: !this.state.xIsNext,
            win: winner,
            step: history.length,
          });
      }

  }
  
  jumpTo(move){
    this.setState({
      xIsNext: (move % 2) === 0,
      step: move
    })
    
    
  }
  
  render() {
    const history = this.state.history;
    let current = history[this.state.step]
    
    let status;
    if (this.state.win){
        status = 'Winner is: ' + this.state.win;
    }
    else{
        const next = this.state.xIsNext? 'X' : 'O';  
        status = 'Next player: ' + next;
    }
  
    const moves = history.map((step, move) => {
      const choice = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{choice}</button>
        </li>
        );
    });
    
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
        <div className="resetter">
          <button className="resetButton" onClick={() => this.reset()}>
            Reset
          </button>
        </div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
