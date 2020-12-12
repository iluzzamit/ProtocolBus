"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DetectionResult_1 = require("../model/DetectionResult");
const utils_1 = require("../common/utils");
const HistoryCANMessage_1 = require("../model/HistoryCANMessage");
class CANBusDetector {
    constructor() {
        this.history = new Map();
    }
    detect(canMessage) {
        const detectionResult = new DetectionResult_1.DetectionResult();
        const current = new HistoryCANMessage_1.HistoryCANMessage(canMessage);
        const result = this.history.get(canMessage.identifier);
        if (result) {
            const dataMap = utils_1.arrayToSet(result.canMessage.dataField);
            if (current.timestamp - result.timestamp < 100) {
                detectionResult.rate = false;
            }
            ;
            if (current.canMessage.dlc === result.canMessage.dlc) {
                detectionResult.length = false;
            }
            current.canMessage.dataField.forEach(byte => {
                if (dataMap.has(byte))
                    detectionResult.data = false;
            });
        }
        this.history.set(canMessage.identifier, new HistoryCANMessage_1.HistoryCANMessage(canMessage));
        return [detectionResult, current];
    }
}
exports.default = CANBusDetector;
//# sourceMappingURL=CANBusDetector.js.map