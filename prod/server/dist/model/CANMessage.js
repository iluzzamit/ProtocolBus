"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANMessage = void 0;
const utils_1 = require("../common/utils");
class CANMessage {
    constructor() {
        this.sof = "1";
        this.identifier = ["0x100", "0x200", "0x300"][Math.round((Math.random() * 10)) % 3];
        this.rtr = "1";
        this.ide = "1";
        this.r = "1";
        this.dlc = 0;
        this.dataField = [];
        this.checkSum = "1";
        this.del = "1";
        this.ack = {
            ack: "1",
            del: "1"
        };
        this.eof = "1";
        this.dlc = Math.floor(utils_1.randomNumber(8));
        this.dataField = [...Array(this.dlc).keys()].map(() => {
            const hexaBased = utils_1.toBase(utils_1.randomNumber(255).toString(), 10, 16);
            return hexaBased;
        });
    }
}
exports.CANMessage = CANMessage;
//# sourceMappingURL=CANMessage.js.map