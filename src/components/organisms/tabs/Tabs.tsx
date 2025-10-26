import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';
import { useId } from '../../../hooks/use-id';

/**
 * Tabs variant types
 *
 * @since 0.1.0
 */
export type TabsVariant = 'line' | 'enclosed' | 'pills';

/**
 * Tabs orientation types
 *
 * @since 0.1.0
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Context value for managing tab state
 *
 * @internal
 */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabsVariant;
  orientation: TabsOrientation;
  disabled?: boolean;
  registerTab: (id: string) => void;
  unregisterTab: (id: string) => void;
  tabIds: string[];
}

/**
 * Context for sharing tab state between components
 *
 * @internal
 */
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

/**
 * Hook to access tabs context
 *
 * @internal
 */
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

/**
 * Props for the Tabs component
 *
 * @remarks
 * Supports both controlled and uncontrolled usage patterns.
 *
 * @since 0.1.0
 */
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Visual variant of the tabs
   * @defaultValue 'line'
   */
  variant?: TabsVariant;

  /**
   * Orientation of the tab list
   * @defaultValue 'horizontal'
   */
  orientation?: TabsOrientation;

  /**
   * Controlled active tab value
   */
  value?: string;

  /**
   * Default active tab value for uncontrolled usage
   * @defaultValue First tab will be active
   */
  defaultValue?: string;

  /**
   * Callback when active tab changes
   */
  onChange?: (value: string) => void;

  /**
   * Whether all tabs are disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Child components (TabList and TabPanels)
   */
  children: ReactNode;
}

/**
 * Props for the TabList component
 *
 * @since 0.1.0
 */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tab components
   */
  children: ReactNode;

  /**
   * Accessible label for the tab list
   */
  'aria-label'?: string;
}

/**
 * Props for the Tab component
 *
 * @since 0.1.0
 */
export interface TabProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /**
   * Unique value for this tab
   */
  value: string;

  /**
   * Whether this tab is disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Optional icon to display before the tab text
   */
  icon?: ReactNode;

  /**
   * Tab content
   */
  children: ReactNode;
}

/**
 * Props for the TabPanel component
 *
 * @since 0.1.0
 */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Value that matches the corresponding Tab
   */
  value: string;

  /**
   * Panel content
   */
  children: ReactNode;
}

/**
 * Get the CSS classes for tabs variant
 *
 * @param variant - The tabs variant
 * @param orientation - The tabs orientation
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getTabListClasses = (variant: TabsVariant, orientation: TabsOrientation): string => {
  const baseClasses = 'flex gap-1';

  const orientationClasses: Record<TabsOrientation, string> = {
    horizontal: 'flex-row',
    vertical: 'flex-col',
  };

  const variantClasses: Record<TabsVariant, string> = {
    line: orientation === 'horizontal' ? 'border-b border-border' : 'border-l border-border',
    enclosed: 'border-b border-border',
    pills: '',
  };

  return cn(baseClasses, orientationClasses[orientation], variantClasses[variant]);
};

/**
 * Get the CSS classes for a tab
 *
 * @param variant - The tabs variant
 * @param orientation - The tabs orientation
 * @param isActive - Whether the tab is active
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getTabClasses = (
  variant: TabsVariant,
  orientation: TabsOrientation,
  isActive: boolean
): string => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'px-4 py-2',
    'text-sm font-medium',
    'transition-interactive',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  ];

  const orientationClasses: Record<TabsOrientation, string> = {
    horizontal: 'min-w-0',
    vertical: 'w-full text-left',
  };

  const variantClasses: Record<TabsVariant, Record<'active' | 'inactive', string>> = {
    line: {
      active:
        orientation === 'horizontal'
          ? 'text-brand-600 border-b-2 border-brand-600 -mb-px'
          : 'text-brand-600 border-l-2 border-brand-600 -ml-px',
      inactive: 'text-text-muted hover:text-text hover:bg-surface-muted',
    },
    enclosed: {
      active: 'text-brand-600 bg-surface border border-border border-b-0 rounded-t-md -mb-px',
      inactive:
        'text-text-muted hover:text-text hover:bg-surface-muted border border-transparent rounded-t-md',
    },
    pills: {
      active: 'text-white bg-brand-600 rounded-md',
      inactive: 'text-text-muted hover:text-text hover:bg-surface-muted rounded-md',
    },
  };

  return cn(
    baseClasses,
    orientationClasses[orientation],
    isActive ? variantClasses[variant].active : variantClasses[variant].inactive
  );
};

/**
 * Tabs component - An accessible tabs system for organizing content.
 *
 * @remarks
 * A fully accessible tabs implementation following WAI-ARIA authoring practices:
 * - Supports both controlled and uncontrolled usage
 * - Multiple visual variants (line, enclosed, pills)
 * - Horizontal and vertical orientations
 * - Full keyboard navigation (Arrow keys, Home, End)
 * - Individual tab disable support
 * - Icon support in tabs
 * - Proper ARIA attributes and roles
 * - WCAG 2.2 AA compliant
 *
 * Features:
 * - Compound component pattern (Tabs, TabList, Tab, TabPanel)
 * - Automatic tab panel visibility management
 * - Focus management and keyboard navigation
 * - Flexible styling with variants and orientations
 * - SSR-friendly with stable IDs
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabList aria-label="Main navigation">
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *     <Tab value="tab3">Tab 3</Tab>
 *   </TabList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 *   <TabPanel value="tab3">Content 3</TabPanel>
 * </Tabs>
 * ```
 *
 * @example
 * Controlled with variants:
 * ```tsx
 * const [activeTab, setActiveTab] = useState('home');
 *
 * <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
 *   <TabList aria-label="Settings">
 *     <Tab value="home" icon={<HomeIcon />}>Home</Tab>
 *     <Tab value="profile" icon={<UserIcon />}>Profile</Tab>
 *     <Tab value="settings" icon={<SettingsIcon />} disabled>Settings</Tab>
 *   </TabList>
 *   <TabPanel value="home">Home content</TabPanel>
 *   <TabPanel value="profile">Profile content</TabPanel>
 *   <TabPanel value="settings">Settings content</TabPanel>
 * </Tabs>
 * ```
 *
 * @example
 * Vertical orientation:
 * ```tsx
 * <Tabs orientation="vertical" variant="line">
 *   <TabList aria-label="Sidebar navigation">
 *     <Tab value="overview">Overview</Tab>
 *     <Tab value="analytics">Analytics</Tab>
 *     <Tab value="reports">Reports</Tab>
 *   </TabList>
 *   <TabPanel value="overview">Overview content</TabPanel>
 *   <TabPanel value="analytics">Analytics content</TabPanel>
 *   <TabPanel value="reports">Reports content</TabPanel>
 * </Tabs>
 * ```
 *
 * @since 0.1.0
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      variant = 'line',
      orientation = 'horizontal',
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [tabIds, setTabIds] = useState<string[]>([]);
    const [uncontrolledValue, setUncontrolledValue] = useState<string>(defaultValue ?? '');

    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : uncontrolledValue;

    // Set initial active tab to first registered tab if no default provided
    useEffect(() => {
      if (!isControlled && !defaultValue && tabIds.length > 0 && !activeTab) {
        const firstTab = tabIds[0];
        if (firstTab) {
          setUncontrolledValue(firstTab);
        }
      }
    }, [isControlled, defaultValue, tabIds, activeTab]);

    const setActiveTab = useCallback(
      (value: string) => {
        if (!isControlled) {
          setUncontrolledValue(value);
        }
        onChange?.(value);
      },
      [isControlled, onChange]
    );

    const registerTab = useCallback((id: string) => {
      setTabIds((prev) => [...prev, id]);
    }, []);

    const unregisterTab = useCallback((id: string) => {
      setTabIds((prev) => prev.filter((tabId) => tabId !== id));
    }, []);

    const contextValue: TabsContextValue = {
      activeTab,
      setActiveTab,
      variant,
      orientation,
      disabled,
      registerTab,
      unregisterTab,
      tabIds,
    };

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-col' : 'flex-row gap-4',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * TabList component - Container for Tab components.
 *
 * @remarks
 * Implements the tablist role and manages keyboard navigation between tabs.
 *
 * @example
 * ```tsx
 * <TabList aria-label="Main sections">
 *   <Tab value="home">Home</Tab>
 *   <Tab value="about">About</Tab>
 * </TabList>
 * ```
 *
 * @since 0.1.0
 */
/**
 * Context for managing tab refs
 *
 * @internal
 */
interface TabRefsContextValue {
  registerTabRef: (value: string, element: HTMLButtonElement | null) => void;
  getTabRef: (value: string) => HTMLButtonElement | null;
}

const TabRefsContext = createContext<TabRefsContextValue | undefined>(undefined);

const useTabRefsContext = () => {
  const context = useContext(TabRefsContext);
  if (!context) {
    throw new Error('TabRefs context must be used within TabList');
  }
  return context;
};

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, 'aria-label': ariaLabel, ...props }, ref) => {
    const { variant, orientation, tabIds, activeTab, setActiveTab, disabled } = useTabsContext();
    const tabRefsMap = useRef<Map<string, HTMLButtonElement>>(new Map());

    const registerTabRef = useCallback((value: string, element: HTMLButtonElement | null) => {
      if (element) {
        tabRefsMap.current.set(value, element);
      } else {
        tabRefsMap.current.delete(value);
      }
    }, []);

    const getTabRef = useCallback((value: string) => {
      return tabRefsMap.current.get(value) ?? null;
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabIds.indexOf(activeTab);
      let nextIndex = currentIndex;

      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      switch (event.key) {
        case nextKey:
          event.preventDefault();
          nextIndex = currentIndex + 1;
          if (nextIndex >= tabIds.length) {
            nextIndex = 0;
          }
          break;
        case prevKey:
          event.preventDefault();
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = tabIds.length - 1;
          }
          break;
        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          nextIndex = tabIds.length - 1;
          break;
        default:
          return;
      }

      // Find next non-disabled tab
      let attempts = 0;
      while (attempts < tabIds.length) {
        const nextTab = tabIds[nextIndex];
        if (!nextTab) break;

        const nextTabElement = tabRefsMap.current.get(nextTab);

        if (nextTabElement && !nextTabElement.disabled) {
          setActiveTab(nextTab);
          nextTabElement.focus();
          break;
        }

        // Move to next tab
        if (event.key === prevKey || event.key === 'Home') {
          nextIndex--;
          if (nextIndex < 0) nextIndex = tabIds.length - 1;
        } else {
          nextIndex++;
          if (nextIndex >= tabIds.length) nextIndex = 0;
        }

        attempts++;
      }
    };

    const tabRefsContextValue = {
      registerTabRef,
      getTabRef,
    };

    return (
      <TabRefsContext.Provider value={tabRefsContextValue}>
        <div
          ref={ref}
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation={orientation}
          aria-disabled={disabled}
          className={cn(getTabListClasses(variant, orientation), className)}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      </TabRefsContext.Provider>
    );
  }
);

TabList.displayName = 'TabList';

/**
 * Tab component - Individual tab button.
 *
 * @remarks
 * Implements the tab role with proper ARIA attributes and keyboard support.
 *
 * @example
 * ```tsx
 * <Tab value="profile" icon={<UserIcon />} disabled>
 *   Profile
 * </Tab>
 * ```
 *
 * @since 0.1.0
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled: tabDisabled = false, icon, children, className, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, orientation, disabled: tabsDisabled, registerTab, unregisterTab } =
      useTabsContext();
    const { registerTabRef } = useTabRefsContext();
    const generatedId = useId('tab');
    const panelId = `${generatedId}-panel`;
    const isActive = activeTab === value;
    const isDisabled = tabsDisabled || tabDisabled;
    const internalRef = useRef<HTMLButtonElement>(null);

    // Register tab value on mount and unregister on unmount
    useEffect(() => {
      registerTab(value);
      return () => {
        unregisterTab(value);
      };
    }, [value, registerTab, unregisterTab]);

    // Handle ref forwarding and registration
    useEffect(() => {
      if (internalRef.current) {
        registerTabRef(value, internalRef.current);
      }
      return () => {
        registerTabRef(value, null);
      };
    }, [value, registerTabRef]);

    // Combine forwarded ref with internal ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(internalRef.current);
      } else if (ref) {
        ref.current = internalRef.current;
      }
    }, [ref]);

    const handleClick = () => {
      if (!isDisabled) {
        setActiveTab(value);
      }
    };

    return (
      <button
        ref={internalRef}
        id={generatedId}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={panelId}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        tabIndex={isActive ? 0 : -1}
        className={cn(getTabClasses(variant, orientation, isActive), className)}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

/**
 * TabPanel component - Content panel associated with a tab.
 *
 * @remarks
 * Automatically shows/hides based on active tab state.
 * Implements the tabpanel role with proper ARIA relationships.
 *
 * @example
 * ```tsx
 * <TabPanel value="home">
 *   <h2>Home Content</h2>
 *   <p>Welcome to the home section.</p>
 * </TabPanel>
 * ```
 *
 * @since 0.1.0
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const generatedId = useId('tab');
    const tabId = generatedId;
    const isActive = activeTab === value;

    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={`${tabId}-panel`}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        className={cn('focus:outline-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
