import CANBusDetector from "../src/bl/CANBusDetector";
import { CANMessage } from "../src/model/CANMessage";
import { DetectionResult } from "../src/model/DetectionResult";
import { HistoryCANMessage } from "../src/model/HistoryCANMessage";

const canBusDecetor = new CANBusDetector();


test('CANBusDetector: detect return params', () => {
    const [detectionResult, historyCANMessage] : [DetectionResult, HistoryCANMessage] = canBusDecetor.detect(new CANMessage())
    
    expect(detectionResult && historyCANMessage).not.toBeNull();
    expect(detectionResult).toStrictEqual({
        rate: true,
        length: true,
        data: true
    })
})