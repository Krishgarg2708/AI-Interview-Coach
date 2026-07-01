'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#pricing', label: 'Pricing' },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass border-b border-glass-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-lg font-bold tracking-tight">
              InterCoach<span className="text-primary"> AI</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {user ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {mounted && theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <div className="flex flex-col gap-4 pt-8">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2">
                      <Logo />
                      <span className="font-display text-lg font-bold">
                        InterCoach<span className="text-primary"> AI</span>
                      </span>
                    </Link>
                  </SheetClose>
                  <div className="flex flex-col gap-2 mt-4">
                    {navLinks.map((link) => (
                      <SheetClose key={link.href} asChild>
                        <Link
                          href={link.href}
                          className="rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {user ? (
                      <SheetClose asChild>
                        <Button asChild>
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                      </SheetClose>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Button variant="outline" asChild>
                            <Link href="/login">Sign In</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button asChild>
                            <Link href="/register">Get Started</Link>
                          </Button>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-chart-1 to-chart-4 shadow-lg ${className ?? ''}`}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.2"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
