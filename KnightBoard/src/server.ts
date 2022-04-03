
import { getValidKnightMovesInTurns } from "./chess"


function isValidPosition(position: any) {
  return ALL_POSITIONS.includes(position)
}
export type Position = 
| "a8" | "b8" | "c8" | "d8" | "e8" | "f8" | "g8" | "h8"
| "a7" | "b7" | "c7" | "d7" | "e7" | "f7" | "g7" | "h7" 
| "a6" | "b6" | "c6" | "d6" | "e6" | "f6" | "g6" | "h6" 
| "a5" | "b5" | "c5" | "d5" | "e5" | "f5" | "g5" | "h5" 
| "a4" | "b4" | "c4" | "d4" | "e4" | "f4" | "g4" | "h4" 
| "a3" | "b3" | "c3" | "d3" | "e3" | "f3" | "g3" | "h3" 
| "a2" | "b2" | "c2" | "d2" | "e2" | "f2" | "g2" | "h2" 
| "a1" | "b1" | "c1" | "d1" | "e1" | "f1" | "g1" | "h1"

export const ALL_POSITIONS: Position[] = [
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
]


let rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Press ^C to exit the Program')

let userInput = function(){

rl.question('Enter the Position Of Knight ', (answer) => {
  if (!answer) {
    console.log('Please give Position of Knight in 8x* Chessboard')
    return
  }
    if (!isValidPosition(answer)) {
      console.log(`Position "${answer}" is not a valid chess position in algebraic notation`)

    }else{
    console.log({ validMoves: getValidKnightMovesInTurns(answer) })
    }
    userInput()
});
}

userInput()