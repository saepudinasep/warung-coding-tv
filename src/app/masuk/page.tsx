import type { Metadata } from 'next';
import { Suspense } from 'react';
import CustomerLoginForm from '@/components/CustomerLoginForm';

export const metadata: Metadata = {
  title: 'Masuk',
  robots: { index: false, follow: false },
};

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={null}>
      <CustomerLoginForm />
    </Suspense>
  );
}
