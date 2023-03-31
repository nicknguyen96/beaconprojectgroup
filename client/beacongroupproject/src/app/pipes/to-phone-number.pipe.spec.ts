import { ToPhoneNumberPipe } from './to-phone-number.pipe';

describe('ToPhoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new ToPhoneNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
