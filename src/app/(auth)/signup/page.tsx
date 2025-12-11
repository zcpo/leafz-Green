import { SignUpForm } from '@/components/auth/SignUpForm';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function SignUpPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/" className="flex justify-center items-center gap-2 text-2xl font-semibold text-foreground">
           <Leaf className="h-6 w-6 text-primary" />
           leafz green
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground font-headline">
          Create a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm />
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Already a member?{' '}
          <Link href="/login" className="font-semibold leading-6 text-primary hover:text-accent">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
