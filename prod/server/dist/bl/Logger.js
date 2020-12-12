"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.logs = [];
        this.add = (log) => {
            this.logs.push(log);
            if (this.socket) {
                this.socket.emit('log', log);
            }
        };
        this.get = () => {
            const sortedLogs = this.logs.sort(({ timestamp: t1 }, { timestamp: t2 }) => t2 - t1);
            const mappedLogs = sortedLogs.map(value => (Object.assign(Object.assign({}, value), { timestamp: new Date(value.timestamp) })));
            return mappedLogs;
        };
    }
    setSocket(socket) {
        this.socket = socket;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map