export interface Data {
    timestamp: string;
    uniqueId: string;
    frame: string;
    detectionResults: DetectionResult;
    canMessage: CANMessage;
}

export interface DetectionResult {
    data: boolean;
    length: boolean;
    rate: boolean;
}

export interface CANMessage {
    sof: string;
    identifier: string;
    rtr: string;
    ide: string;
    r: string;
    dlc: number;
    dataField: any[];
    checkSum: string;
    del: string;
    ack: object;
    eof: string;
}