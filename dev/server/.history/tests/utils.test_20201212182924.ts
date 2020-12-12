import { canDecoder, canEncoder } from '../src/common/utils'
import { validFrame, validMessage } from './examples';

test('Decoder: when valid frame expect valid message',() => {
    const data = canEncoder(validMessage);
    console.log(data);
    // expect(data).toBe(validMessage);
})