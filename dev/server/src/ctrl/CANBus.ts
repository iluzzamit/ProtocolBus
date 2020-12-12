import CANBusGenerator from "../bl/CANBusGenerator";
import CANBusDetector from "../bl/CANBusDetector";
import { CANMessage } from "../model/CANMessage";
import { canDecoder } from "../common/utils";
import { DetectionResult } from "../model/DetectionResult";
import { CANBusReporter } from "../bl/CANReporter";
import { HistoryCANMessage } from "../model/HistoryCANMessage";
import { Events, Log } from "../model/Log";
import { Logger } from "../bl/Logger";

export default class CANBus {
  constructor(
    public generator: CANBusGenerator,
    public detector: CANBusDetector,
    public reporter: CANBusReporter,
    public logger: Logger,
    public canBusEmitter: any
  ) {
    logger.setSocket(canBusEmitter);
  }

  private onFrameGenerated = (frame: string): void => {
    try {
      const canMessage: CANMessage = canDecoder(frame);
      const [detectionResult, historyCanMessage]: [DetectionResult, HistoryCANMessage] =
        this.detector.detect(canMessage);

      this.reporter.addData(historyCanMessage, detectionResult, this.canBusEmitter);
    } catch (e) {
      const log: Log = new Log(Events.failedToDetectFrame, e);
      this.logger.add(log);
      console.log(log);
    }
  };

  startGenerator(): void {
    this.generator.start(this.onFrameGenerated);
    this.logger.add(new Log(Events.StartGenerator));
  }

  stopGenerator(): void {
    this.generator.stop();
    this.logger.add(new Log(Events.StopGenerator));
  }

  isGenerating(): boolean {
    return this.generator.isGenerating();
  }

  getReporterData(): any[] {
    return this.reporter.getData();
  }

  getLogs(): Log[] {
    return this.logger.get();
  }
}
