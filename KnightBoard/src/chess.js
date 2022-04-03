"use strict";
exports.__esModule = true;
exports.ALL_POSITIONS = exports.isValidPosition = exports.getPositionY = exports.getPositionX = exports.isValidKnightMove = exports.getValidKnightMoves = exports.getValidKnightMovesInTurns = void 0;
/**
 * Calculates the valid knight moves in n turns given a starting position.
 * @param from The starting position.
 * @returns An array of array of valid move positions. The first array index is the turn number.
 */
function getValidKnightMovesInTurns(from) {
    var res = [getValidKnightMoves(from)];
    return res;
}
exports.getValidKnightMovesInTurns = getValidKnightMovesInTurns;
/**
 * Calculates the valid immediate knight moves given a starting position.
 * @param from The starting position.
 * @returns An array of valid move positions.
 */
function getValidKnightMoves(from) {
    return exports.ALL_POSITIONS.filter(function (pos) { return isValidKnightMove(from, pos); }).sort();
}
exports.getValidKnightMoves = getValidKnightMoves;
/**
 * Determines whether the move is a valid knight move.
 * @param from The starting position.
 * @param to The end position.
 * @returns True if the move is valid.
 */
function isValidKnightMove(from, to) {
    var pos1 = { x: getPositionX(from), y: getPositionY(from) };
    var pos2 = { x: getPositionX(to), y: getPositionY(to) };
    return ((Math.abs(pos2.x - pos1.x) === 1 && Math.abs(pos2.y - pos1.y) === 2) || // one square horizontally and two squares vertically
        (Math.abs(pos2.x - pos1.x) === 2 && Math.abs(pos2.y - pos1.y) === 1) // two swares horizontally and one square vertically
    );
}
exports.isValidKnightMove = isValidKnightMove;
/**
 * Returns the numeric X position. E.g.: 'a8' is 1.
 * @param position The position in algebraic notation.
 */
function getPositionX(position) {
    return position.charCodeAt(0) - 96; // the charCode of 'a' if 97, 'h' is 104
}
exports.getPositionX = getPositionX;
/**
 * Returns the numeric Y position. E.g.: 'a8' is 8.
 * @param position The position in algebraic notation.
 */
function getPositionY(position) {
    return parseInt(position.charAt(1));
}
exports.getPositionY = getPositionY;
/**
 * Checks whether the position is a valid chess position in algebraic notation.
 * @param position
 */
function isValidPosition(position) {
    return exports.ALL_POSITIONS.includes(position);
}
exports.isValidPosition = isValidPosition;
/**
 * An array of all board positions.
 */
// prettier-ignore
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
