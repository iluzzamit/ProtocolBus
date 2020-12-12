import { HistoryCANMessage } from "../model/HistoryCANMessage";
import { DetectionResult } from "../model/DetectionResult";
import { canEncoder } from "../common/utils";

/*
    CANBusReporter has 2 methods,
        getData let the user the last 100 CAN messages sorted by date (newest first)
        addData to add new messages to the list
*/
export class CANBusReporter {
    data = new Map();

    getData = () => {
        const sortedData = Object.values(this.data).sort(({ timestamp: a }, { timestamp: b }) => b - a);
        const slicedData = sortedData.slice(0,100);
        const mappedData = slicedData.map(value => ({...value, timestamp: new Date(value.timestamp), frame: canEncoder(value.canMessage)}));

        return mappedData;
    }

    addData = (historyCANMessage: HistoryCANMessage, detectionResults: DetectionResult, canBusEmitter) => {
        if (!this.data.has(historyCANMessage.uniqueId)) {
            const newMessage = { ...historyCANMessage, detectionResults };
            this.data[historyCANMessage.uniqueId] = newMessage;

            canBusEmitter.emit('message', newMessage);
        }
    };
}