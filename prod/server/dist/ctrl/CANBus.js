"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
const Log_1 = require("../model/Log");
class CANBus {
    constructor(generator, detector, reporter, logger, canBusEmitter) {
        this.generator = generator;
        this.detector = detector;
        this.reporter = reporter;
        this.logger = logger;
        this.canBusEmitter = canBusEmitter;
        this.onFrameGenerated = (frame) => {
            try {
                const canMessage = utils_1.canDecoder(frame);
                const [detectionResult, historyCanMessage] = this.detector.detect(canMessage);
                this.reporter.addData(historyCanMessage, detectionResult, this.canBusEmitter);
            }
            catch (e) {
                const log = new Log_1.Log(Log_1.Events.failedToDetectFrame, e);
                this.logger.add(log);
                console.log(log);
            }
        };
        logger.setSocket(canBusEmitter);
    }
    startGenerator() {
        this.generator.start(this.onFrameGenerated);
        this.logger.add(new Log_1.Log(Log_1.Events.StartGenerator));
    }
    stopGenerator() {
        this.generator.stop();
        this.logger.add(new Log_1.Log(Log_1.Events.StopGenerator));
    }
    isGenerating() {
        return this.generator.isGenerating();
    }
    getReporterData() {
        return this.reporter.getData();
    }
    getLogs() {
        return this.logger.get();
    }
}
exports.default = CANBus;
//# sourceMappingURL=CANBus.js.map