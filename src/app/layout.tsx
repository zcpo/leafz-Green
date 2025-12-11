import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'leafz green',
  description: 'Your trusted guide to the best dispensaries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased h-full flex flex-col">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <FirebaseClientProvider>
                <AuthProvider>
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1">
                      <Suspense fallback={<Loading />}>
                        {children}
                      </Suspense>
                    </main>
                </div>
                <Toaster />
                </AuthProvider>
            </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
