import { canDecoder, canEncoder } from '../src/common/utils'
import { Log } from '../src/model/Log';
import { invalidFrame, messageWithInvalidDataFieldSize, messageWithInvalidID, validFrame, validMessage } from './examples';

test('Decoder: when valid frame expect valid message',() => {
    expect(canDecoder(validFrame)).toStrictEqual(validMessage);
})

test('Encoder: when valid message expect valid frame',() => {
    expect(canEncoder(validMessage)).toStrictEqual(validFrame);
})

test('Decoder: when invalid frame throw',() => {
    expect(() => canDecoder(invalidFrame)).toThrow(Log);
})

test('Encoder: when invalid message id throw',() => {
    expect(() => canEncoder(messageWithInvalidID)).toThrow(Log);
})

// test('Encoder: when invalid message data-field throw',() => {
//     expect(() => canEncoder(messageWithInvalidDataFieldSize)).toThrow(Log);
// })

