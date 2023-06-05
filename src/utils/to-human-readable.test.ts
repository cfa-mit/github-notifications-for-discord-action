import { toHumanReadable } from './to-human-readable';

describe('toHumanReadable', () => {
  it('translates snake case to a human readable sentence', () => {
    expect(toHumanReadable('some_event')).toBe('some event');
  });
});
