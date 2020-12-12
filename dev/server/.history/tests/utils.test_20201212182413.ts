import { canDecoder, canEncoder } from '../src/common/utils'
import { validFrame, validMessage } from './examples';

test('Decoder: when valid frame expect valid message',() => {
    const data = canDecoder(validFrame);
    expect(data).toBe(validMessage);
})