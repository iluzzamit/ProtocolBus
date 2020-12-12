import { randomNumber, toBase } from "../common/utils";

export class CANMessage {
    sof: string = "1";
    identifier: string = ["0x100", "0x200", "0x300"][Math.round((Math.random() * 10)) % 3]
    rtr: string = "1";
    ide: string = "1";
    r: string = "1";
    dlc: number = 0;
    dataField: any[] = [];
    checkSum: string = "1";
    del: string = "1";
    ack: object = {
        ack: "1",
        del: "1"
    };
    eof: string = "1";

    constructor() {
        this.dlc = Math.floor(randomNumber(8));
        this.dataField = [...Array(this.dlc).keys()].map(() => {
            const hexaBased = toBase(randomNumber(255).toString(),10, 16);
            return hexaBased;
        });
    }
}