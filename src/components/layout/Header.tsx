import Link from 'next/link';
import { UserNav } from '@/components/auth/UserNav';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
       <div className="container flex items-center justify-between h-14 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-foreground">
                <Leaf className="h-5 w-5 text-primary" />
                leafz green
            </Link>
            <div className="flex items-center space-x-2">
                <UserNav />
            </div>
       </div>
    </header>
  );
}
