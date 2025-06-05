'use client';
import { useState } from 'react';
import styles from './PricingCards.module.css';

export interface PricingTierFrequency {
  id: string;
  value: string;
  label: string;
  priceSuffix: string;
}

export interface PricingTier {
  name: string;
  id: string;
  href: string;
  discountPrice: string | Record<string, string>;
  price: string | Record<string, string>;
  description: string | React.ReactNode;
  features: string[];
  featured?: boolean;
  highlighted?: boolean;
  cta: string;
  soldOut?: boolean;
}

export const frequencies: PricingTierFrequency[] = [
  { id: '1', value: '1', label: 'Permanent', priceSuffix: '/Life-time access' },
];

export const tiers: PricingTier[] = [
  {
    name: 'Basic',
    id: '0',
    href: 'https://docs.prodevopsguytech.com',
    price: { '1': '$0' },
    discountPrice: { '1': '' },
    description: `Perfect for getting started with our DevOps resources`,
    features: [
      `Access to 2 files per search`,
      `Basic documentation access`,
      `Online file viewer`,
      `Community support`,
    ],
    featured: false,
    highlighted: false,
    soldOut: false,
    cta: `Get Started for Free`,
  },
  {
    name: 'Premium',
    id: '1',
    href: 'https://docs-admin.prodevopsguytech.com/create-account',
    price: { '1': '₹699 & $18 USD' },
    discountPrice: { '1': '₹499 & $15 USD' },
    description: `Full access to all DevOps & Cloud resources`,
    features: [
      `Unlimited file downloads`,
      `Priority WhatsApp support`,
      `Early access to new content`,
      `Access to 1000+ Premium Docs`,
      `Weekly content updates`,
      `Lifetime access`,
      `No recurring fees`,
    ],
    featured: true,
    highlighted: true,
    soldOut: false,
    cta: `Upgrade to Premium`,
  },
];

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('w-6 h-6', className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const cn = (...args: Array<string | boolean | undefined | null>) =>
  args.filter(Boolean).join(' ');

export default function PricingPage() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div
      className={cn('flex flex-col w-full items-center', styles.fancyOverlay)}
    >
      <div className="w-full flex flex-col items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">

          {frequencies.length > 1 ? (
            <div className="mt-16 flex justify-center">
              <div
                role="radiogroup"
                className="grid gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 bg-white dark:bg-black ring-1 ring-inset ring-gray-200/30 dark:ring-gray-800"
                style={{
                  gridTemplateColumns: `repeat(${frequencies.length}, minmax(0, 1fr))`,
                }}
              >
                <p className="sr-only">Payment frequency</p>
                {frequencies.map((option) => (
                  <label
                    className={cn(
                      frequency.value === option.value
                        ? 'bg-slate-500/90 text-white dark:bg-slate-900/70 dark:text-white/70'
                        : 'bg-transparent text-gray-500 hover:bg-slate-500/10',
                      'cursor-pointer rounded-full px-2.5 py-2 transition-all',
                    )}
                    key={option.value}
                    htmlFor={option.value}
                  >
                    {option.label}

                    <button
                      value={option.value}
                      id={option.value}
                      className="hidden"
                      role="radio"
                      aria-checked={frequency.value === option.value}
                      onClick={() => {
                        setFrequency(
                          frequencies.find(
                            (f) => f.value === option.value,
                          ) as PricingTierFrequency,
                        );
                      }}
                    >
                      {option.label}
                    </button>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12" aria-hidden="true"></div>
          )}

          <div
            className={cn(
              'isolate mx-auto mt-4 mb-28 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none select-none',
              tiers.length === 2 ? 'lg:grid-cols-2 lg:max-w-4xl' : '',
              tiers.length === 3 ? 'lg:grid-cols-3' : '',
            )}
          >
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  tier.featured
                    ? '!bg-gray-900 ring-gray-900 dark:!bg-gray-100 dark:ring-gray-100'
                    : 'bg-white dark:bg-gray-900/80 ring-gray-300/70 dark:ring-gray-700',
                  'min-w-[300px] lg:min-w-[380px] ring-1 rounded-3xl p-8 xl:p-10',
                  tier.highlighted ? styles.fancyGlassContrast : '',
                )}
              >
                <h3
                  id={tier.id}
                  className={cn(
                    tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                    'text-2xl font-bold tracking-tight flex items-center gap-3 flex-wrap',
                  )}
                >
                  {tier.name}
                  {tier.featured && (
                    <>
                      <span className="inline-flex items-center rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        Most Popular
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                        28% OFF
                      </span>
                    </>
                  )}
                </h3>
                <p
                  className={cn(
                    tier.featured
                      ? 'text-gray-300 dark:text-gray-500'
                      : 'text-gray-600 dark:text-gray-400',
                    'mt-4 text-sm leading-6',
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex flex-col gap-2">
                  {tier.featured && (
                    <span className="flex items-center gap-x-1">
                      <span className={cn(
                        'text-2xl font-semibold line-through text-gray-400 dark:text-gray-600'
                      )}>
                        ₹699 & $18 USD
                      </span>
                    </span>
                  )}
                  <span className="flex items-center gap-x-1">
                    <span
                      className={cn(
                        tier.featured ? 'text-white dark:text-black' : 'text-black dark:text-white',
                        'text-4xl font-bold tracking-tight',
                      )}
                    >
                      {typeof tier.discountPrice === 'string'
                        ? tier.discountPrice
                        : tier.discountPrice[frequency.value] || (typeof tier.price === 'string'
                        ? tier.price
                        : tier.price[frequency.value])}
                    </span>

                    {typeof tier.price !== 'string' ? (
                      <span
                        className={cn(
                          tier.featured
                            ? 'text-gray-300 dark:text-gray-500'
                            : 'dark:text-gray-400 text-gray-600',
                          'text-sm font-semibold leading-6 ml-2',
                        )}
                      >
                        {frequency.priceSuffix}
                      </span>
                    ) : null}
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={cn(
                    'flex mt-6 shadow-sm',
                    tier.soldOut ? 'pointer-events-none' : '',
                  )}
                >
                  <button
                    disabled={tier.soldOut}
                    className={cn(
                      'w-full inline-flex items-center justify-center font-medium ring-offset-background hover:opacity-80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-black dark:text-white h-12 rounded-md px-6 sm:px-10 text-md',
                      tier.featured || tier.soldOut ? 'grayscale' : '',
                      !tier.highlighted && !tier.featured
                        ? 'bg-gray-100 dark:bg-gray-600 border border-solid border-gray-300 dark:border-gray-800'
                        : 'bg-slate-300/70 text-slate-foreground hover:bg-slate-400/70 dark:bg-slate-700 dark:hover:bg-slate-800/90',
                      tier.featured ? '!bg-gray-100 dark:!bg-black' : '',
                    )}
                  >
                    {tier.soldOut ? 'Sold out' : tier.cta}
                  </button>
                </a>

                <ul
                  className={cn(
                    tier.featured
                      ? 'text-gray-300 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-400',
                    'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={cn(
                          tier.featured ? 'text-white dark:text-black' : '',
                          tier.highlighted
                            ? 'text-slate-500'
                            : 'text-gray-500',

                          'h-6 w-5 flex-none',
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}  