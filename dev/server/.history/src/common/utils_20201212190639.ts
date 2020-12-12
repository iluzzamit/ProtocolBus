import { CANMessage } from "../model/CANMessage";
import { Events, Log } from "../model/Log";

/* tslint:disable */

function dataDecoder(frame: string, length: number): any[] {
    const indexes = [...Array(length).keys()];

    return indexes.map((index: any) => {
        const piece = frame.slice(index * 8, (index + 1) * 8)
        return toBase(piece, 2, 16);
    });
}

export function canDecoder(frame: string): CANMessage {
    if (frame.length < 19) throw new Log(Events.frameIsInvalid, frame);
    const dataLength = parseInt(toBase(frame.slice(15, 19), 2, 10));
    const dataPointer = dataLength * 8;

    if (frame.length !== 44 + dataPointer) throw new Log(Events.frameIsInvalid, frame);

    const canMessage: CANMessage = {
        sof: frame.slice(0, 1),
        identifier: `0x${toBase(frame.slice(1, 12), 2, 16)}`,
        rtr: frame.slice(12, 13),
        ide: frame.slice(13, 14),
        r: frame.slice(14, 15),
        dlc: dataLength,
        dataField: dataDecoder(frame.slice(19, dataPointer + 19), dataLength),
        checkSum: toBase(frame.slice(dataPointer + 19, dataPointer + 34), 2, 16),
        del: frame.slice(dataPointer + 34, dataPointer + 35),
        ack: {
            ack: frame.slice(dataPointer + 35, dataPointer + 36),
            del: frame.slice(dataPointer + 36, dataPointer + 37),
        },
        eof: toBase(frame.slice(dataPointer + 37, dataPointer + 44), 2, 16),
    }

    return canMessage;
}

export function canEncoder(canMessage: CANMessage) {
    if(canMessage.dlc !== canMessage.dataField.length) throw new Log(Events.messageIsInvalid);
    if(toBase(canMessage.identifier, 16, 2).length > 11) throw new Log(Events.messageIsInvalid);

    let frame = '';
    frame += toBase(canMessage.sof, 16, 2);
    frame += paddingZeros(toBase(canMessage.identifier, 16, 2), 11);
    frame += toBase(canMessage.rtr, 16, 2);
    frame += toBase(canMessage.ide, 16, 2);
    frame += toBase(canMessage.r, 16, 2);
    frame += paddingZeros(toBase(`${canMessage.dlc}`, 16, 2), 4);

    frame += canMessage.dataField.map(byte => {
        const bits = paddingZeros(toBase(byte, 16, 2), 8);
        return bits;
    }).reduce((prev, curr) => prev += curr, '');

    frame += paddingZeros(toBase(canMessage.checkSum, 16, 2), 15);
    frame += toBase(canMessage.del, 16, 2);
    frame += toBase(canMessage.ack['ack'], 16, 2);
    frame += toBase(canMessage.ack['del'], 16, 2);
    frame += paddingZeros(toBase(canMessage.eof, 16, 2), 7);

    return frame;
}

export function printFrame(frame: string): void {
    const canMessage = canDecoder(frame);
    console.info(`Frame SOF: ${canMessage.sof}`)
    console.info(`Frame Identifier: ${canMessage.identifier}`)
    console.info(`Frame RTR: ${canMessage.rtr}`)
    console.info(`Frame IDE: ${canMessage.ide}`)
    console.info(`Frame R: ${canMessage.r}`)
    console.info(`Frame DLC (data length): ${canMessage.dlc}`)
    console.info(`Frame Data-Field: ${canMessage.dataField}`)
    console.info(`Frame CheckSum: ${canMessage.checkSum}`)
    console.info(`Frame DEL: ${canMessage.del}`)
    console.info(`Frame ACKField (ACK,DEL): ${canMessage.ack['ack']},${canMessage.ack['del']}`)
    console.info(`Frame EOF: ${canMessage.eof}`)
}

export const randomNumber = (max: number): number => Math.floor(Math.random() * max + 1);

export const toBase = (value: string, from: number, to: number): string =>
    parseInt(value, from).toString(to).toUpperCase();

export const paddingZeros = (value: string, length: number): string => {
    while (value.length < length) value = "0" + value;
    return value;
}

export const arrayToSet = (array: string[]) => {
    const dataMap: Set<string> = new Set();
    array.forEach(value => dataMap.add(value));
    return dataMap;
}