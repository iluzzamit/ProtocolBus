"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.Events = void 0;
const shortid_1 = require("shortid");
var Events;
(function (Events) {
    Events["Detection"] = "detection";
    Events["StartGenerator"] = "start-generator";
    Events["StopGenerator"] = "stop-generator";
    Events["failedToGetDataAPI"] = "failed-to-get-data-api";
    Events["failedToGetLogs"] = "failed-to-get-logs";
    Events["failedToToggleGeneratorAPI"] = "failed-to-toggle-generator";
    Events["failedToDetectFrame"] = "failed-to-detect-frame";
    Events["userConnected"] = "user-connected";
})(Events = exports.Events || (exports.Events = {}));
class Log {
    constructor(eventName, payload) {
        this.eventName = eventName;
        this.payload = payload;
        this.id = shortid_1.generate();
        this.timestamp = new Date().getTime();
    }
}
exports.Log = Log;
//# sourceMappingURL=Log.js.map