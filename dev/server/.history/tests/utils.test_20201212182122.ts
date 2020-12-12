import { canDecoder, canEncoder } from '../src/common/utils'
import { CANMessage } from '../src/model/CANMessage';
import { validMessage } from './examples';

test('Decoder: when valid frame expect valid message',() => {
    const message = new CANMessage();
    console.log(canEncoder(message));
    expect(message).toBe(validMessage);
})