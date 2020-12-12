"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryCANMessage = void 0;
const shortid_1 = require("shortid");
class HistoryCANMessage {
    constructor(canMessage) {
        this.canMessage = canMessage;
        this.timestamp = new Date().getTime();
        this.uniqueId = shortid_1.generate();
    }
    ;
}
exports.HistoryCANMessage = HistoryCANMessage;
//# sourceMappingURL=HistoryCANMessage.js.map