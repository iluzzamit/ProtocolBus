"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CANBusGenerator {
    constructor(onMessageGenerated) {
        this.onMessageGenerated = onMessageGenerated;
    }
    ;
    csa() {
        console.log(this.onMessageGenerated);
    }
    start() {
        this.intervalID = setInterval(() => {
            setTimeout(() => {
                const message = 'hello world';
            }, (Math.random() * 100) - 50);
        }, 50);
    }
    stop() {
        clearInterval(this.intervalID);
    }
}
exports.default = CANBusGenerator;
//# sourceMappingURL=Generator.js.map