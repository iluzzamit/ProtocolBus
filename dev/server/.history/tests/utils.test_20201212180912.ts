import { canDecoder, canEncoder } from '../src/common/utils'
import { validFrame, validMessage } from './examples';

test('Decoder: when valid message expect valid frame',() => {
    expect(canDecoder(validFrame)).toBe(validMessage);
})