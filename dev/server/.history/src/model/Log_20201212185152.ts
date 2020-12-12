import { generate } from "shortid";

export enum Events {
  Detection = 'detection',
  StartGenerator = 'start-generator',
  StopGenerator = 'stop-generator',
  failedToGetDataAPI = 'failed-to-get-data-api',
  failedToGetLogs = 'failed-to-get-logs',
  failedToToggleGeneratorAPI = 'failed-to-toggle-generator',
  failedToDetectFrame = 'failed-to-detect-frame',
  userConnected = 'user-connected',
  frameIsInvalid = 'frame-invalid',
  messageIsInvalid = 'message-invalid'
}

export class Log {
  id = generate();
  timestamp: any = new Date().getTime();

  constructor(public eventName: Events, public payload?: string) {}
}
