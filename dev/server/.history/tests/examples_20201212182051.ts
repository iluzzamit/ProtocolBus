import { CANMessage } from "../src/model/CANMessage";

export const validFrame = "1" +
    "00000000101" +
    "1" +
    "1" +
    "1" +
    "0010" +
    "0000111100000101" +
    "000000000000001" +
    "1" +
    "1" +
    "1" +
    "0000001";


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
