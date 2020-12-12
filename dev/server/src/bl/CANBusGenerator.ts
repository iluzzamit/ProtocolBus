import setRandomInterval from "set-random-interval";
import { Events, Log } from "../model/Log";
import { CANMessage } from "../model/CANMessage";
import { canEncoder, randomNumber } from "../common/utils";

/*
  CANGenerator generates CAN protocol frame every 50~100 milliseconds,
  and send it to the callback function that the
  father component provides.
*/

export default class CANBusGenerator {
  private intervalID;

  private generateFrame(onFrameGenerated) {
      const frame: string = canEncoder(new CANMessage());

      onFrameGenerated(frame);
  }

  start(onFrameGenerated): void {
    if (!this.intervalID) {
      this.intervalID = setRandomInterval(() =>
        this.generateFrame(onFrameGenerated), 0, 100);
    }
  }

  stop(): void {
    if (this.intervalID) {
      this.intervalID.clear();
      this.intervalID = null;
    }
  }

  isGenerating = (): boolean => !!this.intervalID;
}
