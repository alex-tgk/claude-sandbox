import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('combines multiple class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar')).toBe('foo bar');
    expect(cn('foo', false && 'bar')).toBe('foo');
  });

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles complex combinations', () => {
    expect(
      cn('base', true && 'active', { disabled: false, error: true }, ['extra', 'classes'])
    ).toBe('base active error extra classes');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', null, undefined, false, '', 'bar')).toBe('foo bar');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('preserves duplicate class names (clsx behavior)', () => {
    // clsx does not deduplicate by default
    expect(cn('foo', 'foo', 'bar')).toBe('foo foo bar');
  });
});
