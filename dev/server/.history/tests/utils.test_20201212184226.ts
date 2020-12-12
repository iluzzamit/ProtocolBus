import { canDecoder, canEncoder } from '../src/common/utils'
import { invalidFrame, validFrame, validMessage } from './examples';

test('Decoder: when valid frame expect valid message',() => {
    expect(canDecoder(validFrame)).toStrictEqual(validMessage);
})

test('Encoder: when valid message expect valid frame',() => {
    expect(canEncoder(validMessage)).toStrictEqual(validFrame);
})

test('Decoder: when invalid frame expect valid message',() => {
    expect(canDecoder(invalidFrame)).toThrow();
})