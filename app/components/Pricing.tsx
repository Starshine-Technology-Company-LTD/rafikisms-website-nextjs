"use client";

import { PricingCard, PricingCardProps, ShaderCanvas } from "./ui/animated-glassy-pricing";

const plans: PricingCardProps[] = [
  {
    planName: 'Starter',
    description: '1 to 10,000 SMS',
    price: '18.00',
    features: ['Max cost: 180,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
  },
  {
    planName: 'Growth',
    description: '10,001 to 25,000 SMS',
    price: '17.00',
    features: ['Max cost: 425,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
  },
  {
    planName: 'Business',
    description: '25,001 to 50,000 SMS',
    price: '16.00',
    features: ['Max cost: 800,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
  },
  {
    planName: 'Professional',
    description: '50,001 to 100,000 SMS',
    price: '15.00',
    features: ['Max cost: 1,500,000 TSH'],
    buttonText: 'Get Started',
    isPopular: true,
    buttonVariant: 'primary',
  },
  {
    planName: 'Enterprise',
    description: '100,001 to 250,000 SMS',
    price: '14.00',
    features: ['Max cost: 3,500,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
  },
  {
    planName: 'Corporate',
    description: '250,001 to 500,000 SMS',
    price: '13.00',
    features: ['Max cost: 6,500,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
  },
  {
    planName: 'Scale',
    description: '500,001 to 1,000,000 SMS',
    price: '13.50',
    features: ['Max cost: 13,500,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
  },
  {
    planName: 'Ultimate',
    description: '1,000,001 to 20,000,000 SMS',
    price: '12.00',
    features: ['Max cost: 240,000,000 TSH'],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 transition-colors duration-300 overflow-hidden">
      <ShaderCanvas />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-teal-400 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-teal-500 to-blue-600 dark:from-white dark:via-teal-300 dark:to-blue-400">
              Simple, transparent pricing
            </span>
          </h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-sm leading-relaxed">
            TSH-denominated billing. No monthly minimums. Volume discounts from Tier 3.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <PricingCard key={plan.planName} {...plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://vendor.rafikisms.com/auth/vendor-register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-base transition-all duration-200 cursor-pointer"
          >
            Get started with any plan
          </a>
        </div>
      </div>
    </section>
  );
}
