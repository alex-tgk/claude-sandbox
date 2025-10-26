/**
 * Alert Component Demo
 *
 * This file demonstrates all features of the Alert component.
 * Run this with your dev server to see the Alert in action.
 *
 * @since 0.1.0
 */

import { Alert } from './Alert';

export const AlertDemo = () => {
  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-4">Alert Variants</h2>
        <div className="space-y-4">
          <Alert variant="info" title="Information" description="This is an informational message." />
          <Alert variant="success" title="Success!" description="Your changes have been saved." />
          <Alert variant="warning" title="Warning" description="Please review before proceeding." />
          <Alert variant="error" title="Error" description="Something went wrong." />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Dismissible Alerts</h2>
        <div className="space-y-4">
          <Alert
            variant="info"
            title="Dismissible Alert"
            description="Click the X button to dismiss this alert."
            dismissible
            onDismiss={() => console.log('Alert dismissed')}
          />
          <Alert
            variant="success"
            title="Another Dismissible"
            description="This one is also dismissible!"
            dismissible
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Alerts with Actions</h2>
        <div className="space-y-4">
          <Alert
            variant="warning"
            title="Update Available"
            description="A new version is ready to install."
            action={
              <button
                type="button"
                className="rounded bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-700"
                onClick={() => console.log('Update clicked')}
              >
                Update
              </button>
            }
          />
          <Alert
            variant="error"
            title="Payment Failed"
            description="Your payment could not be processed."
            dismissible
            action={
              <button
                type="button"
                className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                onClick={() => console.log('Retry clicked')}
              >
                Retry
              </button>
            }
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Icons</h2>
        <div className="space-y-4">
          <Alert
            variant="info"
            title="Custom Icon"
            description="This alert uses a custom lightning bolt icon."
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          />
          <Alert
            variant="success"
            title="No Icon"
            description="This alert has no icon for a cleaner look."
            showIcon={false}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Different Content Styles</h2>
        <div className="space-y-4">
          <Alert variant="info" title="Title Only" />
          <Alert variant="success" description="Description only, no title." />
          <Alert variant="warning">Children content only.</Alert>
          <Alert
            variant="error"
            title="Long Content"
            description="This is a very long alert message that demonstrates how the component handles longer text. It should wrap naturally and maintain good readability even with extended content. The layout remains clean and the dismiss button stays aligned properly."
            dismissible
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
        <div className="space-y-4">
          <Alert
            variant="info"
            title="Polite Announcement (Default for Info/Success)"
            description="This alert uses aria-live='polite' which announces to screen readers when the user is idle."
          />
          <Alert
            variant="error"
            title="Assertive Announcement (Default for Warning/Error)"
            description="This alert uses aria-live='assertive' which announces immediately to screen readers."
          />
          <Alert
            variant="info"
            title="Custom aria-live"
            description="You can override the default aria-live value."
            aria-live="assertive"
          />
        </div>
      </section>
    </div>
  );
};

export default AlertDemo;
