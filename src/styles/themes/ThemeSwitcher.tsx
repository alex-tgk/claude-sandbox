/**
 * ThemeSwitcher Component
 * Interactive UI for switching between themes and modes
 *
 * @remarks
 * - Demonstrates theme switching capabilities
 * - Provides UI for selecting themes and toggling dark mode
 * - Shows current theme information
 * - Perfect for demo purposes and user preferences
 *
 * @since 0.1.0
 */

import { useTheme } from './ThemeProvider';

export interface ThemeSwitcherProps {
  /** CSS class name */
  className?: string;
  /** Whether to show theme descriptions */
  showDescriptions?: boolean;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * ThemeSwitcher component for demonstration and user preferences
 *
 * @example
 * ```tsx
 * import { ThemeSwitcher } from '@/styles/themes';
 *
 * function SettingsPage() {
 *   return (
 *     <div>
 *       <h2>Theme Settings</h2>
 *       <ThemeSwitcher showDescriptions />
 *     </div>
 *   );
 * }
 * ```
 */
export function ThemeSwitcher({
  className = '',
  showDescriptions = true,
  orientation = 'vertical',
}: ThemeSwitcherProps): JSX.Element {
  const { themeName, setTheme, mode, toggleMode, availableThemes } =
    useTheme();

  return (
    <div
      className={`${orientation === 'vertical' ? 'space-y-6' : 'space-x-6 flex items-start'} ${className}`}
    >
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text-primary">
          Select Theme
        </h3>
        <div
          className={`${orientation === 'vertical' ? 'space-y-2' : 'space-x-2 flex flex-wrap'}`}
        >
          {availableThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name as any)}
              className={`
                px-4 py-3 border-2 transition-all duration-110
                ${
                  themeName === theme.name
                    ? 'border-interactive bg-interactive/10'
                    : 'border-border-subtle hover:border-border-interactive'
                }
                ${orientation === 'vertical' ? 'w-full text-left' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary">
                    {theme.displayName}
                  </div>
                  {showDescriptions && (
                    <div className="text-sm text-text-secondary mt-1">
                      {theme.description}
                    </div>
                  )}
                </div>
                {themeName === theme.name && (
                  <svg
                    className="w-5 h-5 text-interactive"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Toggle */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text-primary">
          Color Mode
        </h3>
        <button
          onClick={toggleMode}
          className="
            px-6 py-3 border-2 border-border-interactive
            bg-interactive text-text-on-color
            hover:bg-interactive-hover active:bg-interactive-active
            transition-all duration-110
            w-full font-semibold
          "
        >
          <div className="flex items-center justify-center space-x-2">
            {mode === 'light' ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span>Switch to Dark Mode</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Switch to Light Mode</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Current Theme Info */}
      <div className="mt-6 p-4 border-2 border-border-subtle bg-layer-01">
        <h4 className="text-sm font-semibold text-text-secondary mb-2">
          Current Configuration
        </h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-text-helper">Theme:</span>
            <span className="text-text-primary font-mono">{themeName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-helper">Mode:</span>
            <span className="text-text-primary font-mono">{mode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
