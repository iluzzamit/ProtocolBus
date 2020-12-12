import { DetectionResult } from "../model/DetectionResult";
import { CANMessage } from "../model/CANMessage";
import { arrayToSet } from "../common/utils";
import { HistoryCANMessage } from "../model/HistoryCANMessage";

/*
  CANDetector gets a CANMessage from the father component,
  and have the abillity to detect if there any
  issues with the recived message.
*/


export default class CANBusDetector {
  history: Map<string, HistoryCANMessage> = new Map();

  detect(canMessage: CANMessage): [DetectionResult, HistoryCANMessage] {
    const detectionResult: DetectionResult = new DetectionResult();
    const current: HistoryCANMessage = new HistoryCANMessage(canMessage)
    const result: HistoryCANMessage = this.history.get(canMessage.identifier);

    if (result) {
      const dataMap: Set<string> = arrayToSet(result.canMessage.dataField);

      if (current.timestamp - result.timestamp < 100) {
        detectionResult.rate = false;
      };
      if (current.canMessage.dlc === result.canMessage.dlc) {
        detectionResult.length = false;
      }
      current.canMessage.dataField.forEach(byte => {
        if (dataMap.has(byte)) detectionResult.data = false;
      })
    }
    this.history.set(canMessage.identifier, new HistoryCANMessage(canMessage));

    return [detectionResult,current];
  }
}