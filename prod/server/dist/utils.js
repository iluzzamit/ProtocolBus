"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayToSet = exports.paddingZeros = exports.toBase = exports.randomNumber = exports.printFrame = exports.canEncoder = exports.canDecoder = void 0;
function dataDecoder(frame, length) {
    const indexes = [...Array(length).keys()];
    return indexes.map((index) => {
        const piece = frame.slice(index * 8, (index + 1) * 8);
        return exports.toBase(piece, 2, 16);
    });
}
function canDecoder(frame) {
    const dataLength = parseInt(exports.toBase(frame.slice(15, 19), 2, 10));
    const dataPointer = dataLength * 8;
    const canMessage = {
        sof: frame.slice(0, 1),
        identifier: `0x${exports.toBase(frame.slice(1, 12), 2, 16)}`,
        rtr: frame.slice(12, 13),
        ide: frame.slice(13, 14),
        r: frame.slice(14, 15),
        dlc: dataLength,
        dataField: dataDecoder(frame.slice(19, dataPointer + 19), dataLength),
        checkSum: exports.toBase(frame.slice(dataPointer + 19, dataPointer + 34), 2, 16),
        del: frame.slice(dataPointer + 34, dataPointer + 35),
        ack: {
            ack: frame.slice(dataPointer + 35, dataPointer + 36),
            del: frame.slice(dataPointer + 36, dataPointer + 37),
        },
        eof: exports.toBase(frame.slice(dataPointer + 37, dataPointer + 44), 2, 16),
    };
    return canMessage;
}
exports.canDecoder = canDecoder;
function canEncoder(canMessage) {
    let frame = '';
    frame += exports.toBase(canMessage.sof, 16, 2);
    frame += exports.paddingZeros(exports.toBase(canMessage.identifier, 16, 2), 11);
    frame += exports.toBase(canMessage.rtr, 16, 2);
    frame += exports.toBase(canMessage.ide, 16, 2);
    frame += exports.toBase(canMessage.r, 16, 2);
    frame += exports.paddingZeros(exports.toBase(`${canMessage.dlc}`, 16, 2), 4);
    frame += canMessage.dataField.map(byte => {
        const bits = exports.paddingZeros(exports.toBase(byte, 16, 2), 8);
        return bits;
    }).reduce((prev, curr) => prev += curr, '');
    frame += exports.paddingZeros(exports.toBase(canMessage.checkSum, 16, 2), 15);
    frame += exports.toBase(canMessage.del, 16, 2);
    frame += exports.toBase(canMessage.ack['ack'], 16, 2);
    frame += exports.toBase(canMessage.ack['del'], 16, 2);
    frame += exports.paddingZeros(exports.toBase(canMessage.eof, 16, 2), 7);
    return frame;
}
exports.canEncoder = canEncoder;
function printFrame(frame) {
    const canMessage = canDecoder(frame);
    console.info(`Frame SOF: ${canMessage.sof}`);
    console.info(`Frame Identifier: ${canMessage.identifier}`);
    console.info(`Frame RTR: ${canMessage.rtr}`);
    console.info(`Frame IDE: ${canMessage.ide}`);
    console.info(`Frame R: ${canMessage.r}`);
    console.info(`Frame DLC (data length): ${canMessage.dlc}`);
    console.info(`Frame Data-Field: ${canMessage.dataField}`);
    console.info(`Frame CheckSum: ${canMessage.checkSum}`);
    console.info(`Frame DEL: ${canMessage.del}`);
    console.info(`Frame ACKField (ACK,DEL): ${canMessage.ack['ack']},${canMessage.ack['del']}`);
    console.info(`Frame EOF: ${canMessage.eof}`);
}
exports.printFrame = printFrame;
const randomNumber = (max) => Math.floor(Math.random() * max + 1);
exports.randomNumber = randomNumber;
const toBase = (value, from, to) => parseInt(value, from).toString(to).toUpperCase();
exports.toBase = toBase;
const paddingZeros = (value, length) => {
    while (value.length < length)
        value = "0" + value;
    return value;
};
exports.paddingZeros = paddingZeros;
const arrayToSet = (array) => {
    const dataMap = new Set();
    array.forEach(value => dataMap.add(value));
    return dataMap;
};
exports.arrayToSet = arrayToSet;
//# sourceMappingURL=utils.js.map