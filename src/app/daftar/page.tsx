import type { Metadata } from 'next';
import RegisterForm from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Daftar Gratis',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
