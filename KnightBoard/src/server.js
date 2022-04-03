"use strict";
exports.__esModule = true;
exports.ALL_POSITIONS = void 0;
var chess_1 = require("./chess");
function isValidPosition(position) {
    return exports.ALL_POSITIONS.includes(position);
}
exports.ALL_POSITIONS = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
];
var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Press ^C to exit the Program');
var userInput = function () {
    rl.question('Enter the Position Of Knight ', function (answer) {
        if (!answer) {
            console.log('Please give Position of Knight in 8x* Chessboard');
            return;
        }
        if (!isValidPosition(answer)) {
            console.log("Position \"".concat(answer, "\" is not a valid chess position in algebraic notation"));
        }
        else {
            console.log({ validMoves: (0, chess_1.getValidKnightMovesInTurns)(answer) });
        }
        userInput();
    });
};
userInput();
