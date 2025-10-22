import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useControlledState } from './use-controlled-state';

describe('useControlledState', () => {
  describe('uncontrolled mode', () => {
    it('uses default value when provided', () => {
      const { result } = renderHook(() =>
        useControlledState<string>({
          defaultValue: 'initial',
        })
      );

      expect(result.current[0]).toBe('initial');
    });

    it('updates internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControlledState<string>({
          defaultValue: 'initial',
        })
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(result.current[0]).toBe('updated');
    });

    it('calls onChange callback when value changes', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControlledState<string>({
          defaultValue: 'initial',
          onChange,
        })
      );

      act(() => {
        result.current[1]('updated');
      });

      expect(onChange).toHaveBeenCalledWith('updated');
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('controlled mode', () => {
    it('uses controlled value when provided', () => {
      const { result } = renderHook(() =>
        useControlledState<string>({
          value: 'controlled',
          defaultValue: 'initial',
        })
      );

      expect(result.current[0]).toBe('controlled');
    });

    it('does not update internal state when setValue is called', () => {
      const { result } = renderHook(() =>
        useControlledState<string>({
          value: 'controlled',
        })
      );

      act(() => {
        result.current[1]('should-not-update');
      });

      expect(result.current[0]).toBe('controlled');
    });

    it('calls onChange callback when setValue is called', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControlledState<string>({
          value: 'controlled',
          onChange,
        })
      );

      act(() => {
        result.current[1]('new-value');
      });

      expect(onChange).toHaveBeenCalledWith('new-value');
      expect(result.current[0]).toBe('controlled');
    });

    it('updates when controlled value prop changes', () => {
      const { result, rerender } = renderHook(
        ({ value }) =>
          useControlledState<string>({
            value,
          }),
        {
          initialProps: { value: 'first' },
        }
      );

      expect(result.current[0]).toBe('first');

      rerender({ value: 'second' });

      expect(result.current[0]).toBe('second');
    });
  });
});
