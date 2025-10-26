import Link from 'next/link';

/**
 * Pricing page showcasing different licensing tiers and options.
 */
export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="container-custom text-center">
          <h1>Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Choose the plan that works best for your team. All plans include
            access to the complete component library and documentation.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} {...tier} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-6 border-b border-neutral-200 last:border-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Pricing card component
 */
function PricingCard({ name, price, description, features, cta, highlighted }: PricingTier) {
  return (
    <div
      className={`p-8 bg-white border-2 transition-all ${
        highlighted
          ? 'border-primary-500 shadow-lg scale-105'
          : 'border-neutral-200 hover:border-neutral-300'
      }`}
    >
      {highlighted && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-500 text-white">
            MOST POPULAR
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-neutral-600">/month</span>}
      </div>
      <p className="text-neutral-600 mb-6">{description}</p>

      <Link
        href="/docs"
        className={`block w-full text-center px-6 py-3 font-medium transition-colors ${
          highlighted
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-white text-neutral-900 border-2 border-neutral-300 hover:bg-neutral-50'
        }`}
      >
        {cta}
      </Link>

      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="h-5 w-5 text-success-500 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-neutral-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Type definitions
 */
interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

/**
 * Pricing tiers
 */
const pricingTiers: PricingTier[] = [
  {
    name: 'Open Source',
    price: 'Free',
    description: 'Perfect for personal projects and small teams.',
    cta: 'Get Started',
    features: [
      'All components included',
      'MIT License',
      'Community support',
      'Regular updates',
      'TypeScript definitions',
      'Basic documentation',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For professional developers and growing teams.',
    cta: 'Start Free Trial',
    highlighted: true,
    features: [
      'Everything in Open Source',
      'Priority support',
      'Advanced components',
      'Figma design files',
      'Private Discord channel',
      'Commercial license',
      'Custom theme generator',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs.',
    cta: 'Contact Sales',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom components',
      'Training & onboarding',
      'SLA guarantee',
      'White-label options',
      'Custom integrations',
      'Source code access',
    ],
  },
];

/**
 * FAQ data
 */
const faqs: FAQ[] = [
  {
    question: 'Is the library really free for commercial use?',
    answer:
      'Yes! The open source version is MIT licensed and can be used in commercial projects without restrictions. The Pro and Enterprise tiers offer additional features and support.',
  },
  {
    question: 'Can I try Pro before purchasing?',
    answer:
      'Absolutely! We offer a 14-day free trial for the Pro tier with no credit card required. Cancel anytime during the trial period.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'Open source users get community support through GitHub Discussions. Pro users get priority email support with 24-hour response time. Enterprise customers get dedicated support with SLA guarantees.',
  },
  {
    question: 'Do you offer discounts for non-profits or education?',
    answer:
      'Yes! We offer 50% discounts for non-profit organizations and educational institutions. Contact us for more information.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing period.',
  },
];
