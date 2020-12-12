import CANBusDetector from "../src/bl/CANBusDetector";
import CANBusGenerator from "../src/bl/CANBusGenerator";
import { toBase } from "../src/common/utils";
import { DetectionResult } from "../src/model/DetectionResult";
import { HistoryCANMessage } from "../src/model/HistoryCANMessage";
import { validMessage } from "./examples";
import { stallTime } from "./tests-utils";

const canBusDecetor: CANBusDetector = new CANBusDetector();
const canBusGenerator: CANBusGenerator = new CANBusGenerator();


test('CANBusDetector: detect return params', () => {
    const [detectionResult, historyCANMessage] : [DetectionResult, HistoryCANMessage] = canBusDecetor.detect(validMessage)
    
    expect(detectionResult && historyCANMessage).not.toBeNull();
    console.log(detectionResult);
    expect(detectionResult).toStrictEqual(new DetectionResult());
    expect(historyCANMessage.canMessage).toStrictEqual(validMessage);
    expect(historyCANMessage.uniqueId).not.toBeNull();
    expect(historyCANMessage.timestamp).not.toBeNull();
})

// test('CANBusGenerator: generate new frames',async () => {
//     const onFrameGenerated = (frame) => {
//         const dataLength = parseInt(toBase(frame.slice(15, 19), 2, 10));
//         const dataPointer = dataLength * 8;
//         expect(frame.length !== 44 + dataPointer).toBeTruthy();
//     }
    
//     canBusGenerator.start(onFrameGenerated);
//     await stallTime(200);
//     canBusGenerator.stop();
// })