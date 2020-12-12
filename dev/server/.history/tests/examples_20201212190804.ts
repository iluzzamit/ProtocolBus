import { CANMessage } from "../src/model/CANMessage";

export const invalidFrame: string = "1011000000001001011111010010000000000000000000011110000001"
export const validFrame: string = "101100000000111001011111010010000000000000000000011110000001"
export const validMessage: CANMessage = {
    sof: '1',
    identifier: '0x300',
    rtr: '1',
    ide: '1',
    r: '1',
    dlc: 2,
    dataField: ['FA', '40'],
    checkSum: '1',
    del: '1',
    ack: { ack: '1', del: '1' },
    eof: '1'
}

export const messageWithInvalidDataFieldSize: CANMessage = {
    sof: '1',
    identifier: '0x300',
    rtr: '1',
    ide: '1',
    r: '1',
    dlc: 2,
    dataField: ['FA', '40', '5S'],
    checkSum: '1',
    del: '1',
    ack: { ack: '1', del: '1' },
    eof: '1'
}

export const messageWithInvalidID: CANMessage = {
    sof: '1',
    identifier: '0x4000',
    rtr: '1',
    ide: '1',
    r: '1',
    dlc: 2,
    dataField: ['FA', '40'],
    checkSum: '1',
    del: '1',
    ack: { ack: '1', del: '1' },
    eof: '1'
}