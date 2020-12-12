"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canMapper = exports.canParser = exports.toBase = void 0;
const Message_1 = require("../model/Message");
const toBase = (value, base, fromBase) => parseInt(value, fromBase || 2).toString(base).toUpperCase();
exports.toBase = toBase;
const splice = (str, numOfChars, base) => {
    const slice = exports.toBase(str.slice(0, numOfChars), base || 16);
    const rest = str.substring(numOfChars, str.length);
    return [slice, rest];
};
function canParser(frame) {
    const message = new Message_1.CANMessage();
    let tempByte;
    [message.sof, frame] = splice(frame, 1);
    [message.identifier, frame] = splice(frame, 11);
    [message.rtr, frame] = splice(frame, 1);
    [message.ide, frame] = splice(frame, 1);
    [message.r, frame] = splice(frame, 1);
    [message.dlc, frame] = splice(frame, 4, 10);
    for (let i = 0; i < Number(message.dlc); i++) {
        [tempByte, frame] = splice(frame, 8);
        message.dataField.push(tempByte);
    }
    [message.checkSum, frame] = splice(frame, 15);
    [message.del, frame] = splice(frame, 1);
    [message.ack.ack, frame] = splice(frame, 1);
    [message.ack.del, frame] = splice(frame, 1);
    [message.eof, frame] = splice(frame, 7);
    return message;
}
exports.canParser = canParser;
function canMapper(message) {
    let frame = '';
    frame += exports.toBase(message.sof, 2, 16) + ' ';
    frame += leadingZeros(exports.toBase(message.identifier, 2, 16), 11) + ' ';
    frame += exports.toBase(message.rtr, 2, 16) + ' ';
    frame += exports.toBase(message.ide, 2, 16) + ' ';
    frame += exports.toBase(message.r, 2, 16) + ' ';
    frame += leadingZeros(exports.toBase(message.dlc, 2, 10), 4) + ' ';
    frame += message.dataField.reduce((prev, curr) => prev += leadingZeros(exports.toBase(curr, 2, 16), 8) + ' ', '') + ' ';
    frame += leadingZeros(exports.toBase(message.checkSum, 2, 16), 15) + ' ';
    frame += exports.toBase(message.del, 2, 16) + ' ';
    frame += exports.toBase(message.ack.ack, 2, 16) + ' ';
    frame += exports.toBase(message.ack.del, 2, 16) + ' ';
    frame += leadingZeros(exports.toBase(message.eof, 2, 16), 7) + ' ';
    return frame;
}
exports.canMapper = canMapper;
function leadingZeros(str, size) {
    while (str.length < (size || 2)) {
        str = "0" + str;
    }
    return str;
}
//# sourceMappingURL=coder.js.map