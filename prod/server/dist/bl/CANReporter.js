"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CANBusReporter = void 0;
const utils_1 = require("../common/utils");
class CANBusReporter {
    constructor() {
        this.data = new Map();
        this.getData = () => {
            const sortedData = Object.values(this.data).sort(({ timestamp: a }, { timestamp: b }) => b - a);
            const slicedData = sortedData.slice(0, 100);
            const mappedData = slicedData.map(value => (Object.assign(Object.assign({}, value), { timestamp: new Date(value.timestamp), frame: utils_1.canEncoder(value.canMessage) })));
            return mappedData;
        };
        this.addData = (historyCANMessage, detectionResults, canBusEmitter) => {
            if (!this.data.has(historyCANMessage.uniqueId)) {
                const newMessage = Object.assign(Object.assign({}, historyCANMessage), { detectionResults });
                this.data[historyCANMessage.uniqueId] = newMessage;
                canBusEmitter.emit('message', newMessage);
            }
        };
    }
}
exports.CANBusReporter = CANBusReporter;
//# sourceMappingURL=CANReporter.js.map