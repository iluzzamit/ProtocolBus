"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set_random_interval_1 = require("set-random-interval");
const CANMessage_1 = require("../model/CANMessage");
const utils_1 = require("../common/utils");
class CANBusGenerator {
    constructor() {
        this.isGenerating = () => !!this.intervalID;
    }
    generateFrame(onFrameGenerated) {
        const frame = utils_1.canEncoder(new CANMessage_1.CANMessage());
        onFrameGenerated(frame);
    }
    start(onFrameGenerated) {
        if (!this.intervalID) {
            this.intervalID = set_random_interval_1.default(() => this.generateFrame(onFrameGenerated), 0, 100);
        }
    }
    stop() {
        if (this.intervalID) {
            this.intervalID.clear();
            this.intervalID = null;
        }
    }
}
exports.default = CANBusGenerator;
//# sourceMappingURL=CANBusGenerator.js.map