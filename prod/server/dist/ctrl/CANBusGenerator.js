"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CANBusGenerator {
    start(onMessage) {
        if (!this.intervalID) {
            this.intervalID = setInterval(() => {
                setTimeout(() => {
                    const message = "hello world";
                    onMessage(message);
                }, Math.random() * 100 - 50);
            }, 500);
        }
    }
    stop() {
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    }
}
exports.default = CANBusGenerator;
//# sourceMappingURL=CANBusGenerator.js.map