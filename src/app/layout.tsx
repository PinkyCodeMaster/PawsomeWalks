import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PawsomeWalks - Professional Dog Walking Services',
  description: 'Connect with trusted dog walkers in your area. Schedule walks, join group events, and build a community of dog lovers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Navigation />
              <main className="container mx-auto px-4 py-6">
                {children}
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}