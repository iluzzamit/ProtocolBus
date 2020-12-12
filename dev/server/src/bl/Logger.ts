import { Log } from "../model/Log";


export class Logger {
    logs: Log[] = [];
    socket;

    setSocket(socket) {
        this.socket = socket;
    }

    add = (log: Log) => {
        this.logs.push(log);
        if(this.socket){
            this.socket.emit('log', log);
        }
    }
    get = (): Log[] => {
        const sortedLogs = this.logs.sort(({ timestamp: t1}, { timestamp: t2}) => t2-t1);
        const mappedLogs = sortedLogs.map(value => ({ ...value, timestamp: new Date(value.timestamp)}))

        return mappedLogs;
    }

}