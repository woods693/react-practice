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
  constructor(props){
    super(props);
    this.state={
        squares: Array(9).fill(null),
        xIsNext: true,
        sqrTaken: Array(9).fill(false),
        histSquares: Array(9).fill(null),
        turn: 0,
    };
  }
  
  renderSquare(i) {
    return (
        <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
    );
  }

    handleClick(i){
        //to maintain immutable code, slice is called to make a copy
        const squares = this.state.squares.slice();
        const sqrTaken = this.state.sqrTaken.slice();
        //if false => O, true => true
        if (!sqrTaken[i]){
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            sqrTaken[i] = true
            
            let histSquares = this.state.histSquares.slice();
            histSquares[this.state.turn] = squares
            let k = this.state.turn + 1
            
            this.setState({
                squares: squares,
                sqrTaken: sqrTaken,
                //flips bool
                xIsNext: !this.state.xIsNext,
                histSquares: histSquares,
                turn: k
         
            });
        }

    }
    
    reset(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            sqrTaken: Array(9).fill(false),
            
            turn: 0,
            histSquares: Array(9).fill(null)
        })
    }

  render() {
    const winner = findingWinner(this.state.squares)
    let status
    if (winner){
        status = 'Winner is: ' + winner
    }
    else{
        const next = this.state.xIsNext? 'X' : 'O';  
        status = 'Next player: ' + next;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
            <div className="resetter">
                <button className="resetButton" onClick={() => this.reset()}>
                    Reset
                </button>
            </div>
      </div>
    );
  }
  
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
