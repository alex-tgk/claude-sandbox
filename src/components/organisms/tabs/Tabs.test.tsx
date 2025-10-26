import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { useState } from 'react';

// Helper component for controlled tests
function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <TabList aria-label="Controlled tabs">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  describe('rendering', () => {
    it('renders with default variant and orientation', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Test tabs">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    });

    it('renders all tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Multiple tabs">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('renders with line variant', () => {
      render(
        <Tabs defaultValue="tab1" variant="line">
          <TabList aria-label="Line tabs">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveClass('border-b');
    });

    it('renders with pills variant', () => {
      render(
        <Tabs defaultValue="tab1" variant="pills">
          <TabList aria-label="Pills tabs">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      expect(tab).toHaveClass('rounded-md');
    });

    it('renders with vertical orientation', () => {
      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <TabList aria-label="Vertical tabs">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical');
      expect(tablist).toHaveClass('flex-col');
    });

    it('renders with icon in tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Icon tabs">
            <Tab value="tab1" icon={<span data-testid="icon">Icon</span>}>
              Tab 1
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('shows only active panel content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Panel test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('renders disabled tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Disabled tab test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      const disabledTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(disabledTab).toBeDisabled();
      expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    });

    it('disables all tabs when tabs component is disabled', () => {
      render(
        <Tabs defaultValue="tab1" disabled>
          <TabList aria-label="All disabled">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeDisabled();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeDisabled();
    });
  });

  describe('interactions', () => {
    it('switches tabs on click', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Clickable tabs">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('calls onChange when tab changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1" onChange={handleChange}>
          <TabList aria-label="onChange test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(handleChange).toHaveBeenCalledWith('tab2');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not switch when clicking disabled tab', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Disabled click test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('works in controlled mode', async () => {
      const user = userEvent.setup();

      render(<ControlledTabs />);

      expect(screen.getByText('Content 1')).toBeInTheDocument();

      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('navigates to next tab with ArrowRight in horizontal mode', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1" orientation="horizontal">
          <TabList aria-label="Arrow right test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();

      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('navigates to previous tab with ArrowLeft in horizontal mode', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab2" orientation="horizontal">
          <TabList aria-label="Arrow left test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();

      await user.keyboard('{ArrowLeft}');

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('navigates to next tab with ArrowDown in vertical mode', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1" orientation="vertical">
          <TabList aria-label="Arrow down test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();

      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
    });

    it('navigates to previous tab with ArrowUp in vertical mode', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab2" orientation="vertical">
          <TabList aria-label="Arrow up test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      tab2.focus();

      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
    });

    it('wraps to first tab when navigating right from last tab', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab3">
          <TabList aria-label="Wrap forward test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      tab3.focus();

      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
    });

    it('wraps to last tab when navigating left from first tab', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Wrap backward test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();

      await user.keyboard('{ArrowLeft}');

      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
    });

    it('navigates to first tab with Home key', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab3">
          <TabList aria-label="Home key test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      tab3.focus();

      await user.keyboard('{Home}');

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('navigates to last tab with End key', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="End key test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();

      await user.keyboard('{End}');

      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });

    it('skips disabled tabs when navigating with keyboard', async () => {
      const user = userEvent.setup();

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Skip disabled test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2" disabled>
              Tab 2
            </Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
          <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      tab1.focus();

      await user.keyboard('{ArrowRight}');

      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
      expect(screen.getByText('Content 3')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA roles', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="ARIA test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.getByRole('tab')).toBeInTheDocument();
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('sets aria-selected on active tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="aria-selected test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
    });

    it('sets correct tabIndex on tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="tabIndex test">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
          <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('tabIndex', '0');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('tabIndex', '-1');
    });

    it('sets aria-controls linking tab to panel', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="aria-controls test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      const panel = screen.getByRole('tabpanel');

      expect(tab).toHaveAttribute('aria-controls');
      const controlsId = tab.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
    });

    it('sets aria-labelledby on panel', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="aria-labelledby test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveAttribute('aria-labelledby');
    });

    it('supports custom aria-label on TabList', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Custom navigation">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-label', 'Custom navigation');
    });

    it('sets aria-orientation attribute', () => {
      const { rerender } = render(
        <Tabs defaultValue="tab1" orientation="horizontal">
          <TabList aria-label="Orientation test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');

      rerender(
        <Tabs defaultValue="tab1" orientation="vertical">
          <TabList aria-label="Orientation test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('supports ref forwarding on Tabs', () => {
      const ref = { current: null as HTMLDivElement | null };

      render(
        <Tabs ref={ref} defaultValue="tab1">
          <TabList aria-label="Ref test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('supports ref forwarding on Tab', () => {
      const ref = { current: null as HTMLButtonElement | null };

      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Tab ref test">
            <Tab ref={ref} value="tab1">
              Tab 1
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('styling', () => {
    it('accepts custom className on Tabs', () => {
      const { container } = render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <TabList aria-label="Custom class test">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tabsContainer = container.querySelector('.custom-tabs');
      expect(tabsContainer).toBeInTheDocument();
      expect(tabsContainer).toHaveClass('flex');
    });

    it('accepts custom className on Tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Custom tab class">
            <Tab value="tab1" className="custom-tab">
              Tab 1
            </Tab>
          </TabList>
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      );

      const tab = screen.getByRole('tab');
      expect(tab).toHaveClass('custom-tab');
    });

    it('accepts custom className on TabPanel', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList aria-label="Custom panel class">
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
          <TabPanel value="tab1" className="custom-panel">
            Content 1
          </TabPanel>
        </Tabs>
      );

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveClass('custom-panel');
    });
  });

  describe('error handling', () => {
    it('throws error when Tab is used outside Tabs', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<Tab value="tab1">Tab 1</Tab>);
      }).toThrow('Tab components must be used within a Tabs component');

      consoleError.mockRestore();
    });

    it('throws error when TabList is used outside Tabs', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(
          <TabList aria-label="Invalid">
            <div>Content</div>
          </TabList>
        );
      }).toThrow('Tab components must be used within a Tabs component');

      consoleError.mockRestore();
    });

    it('throws error when TabPanel is used outside Tabs', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabPanel value="tab1">Content</TabPanel>);
      }).toThrow('Tab components must be used within a Tabs component');

      consoleError.mockRestore();
    });
  });
});
