"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { DogIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/book",
    label: "Book a Walk",
  },
  {
    href: "/walkers",
    label: "Find Walkers",
  },
  {
    href: "/community",
    label: "Community",
  },
  {
    href: "/group-walks",
    label: "Group Walks",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-0 flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <DogIcon className="h-6 w-6" />
          <span className="font-bold">PawsomeWalks</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center ml-auto space-x-4">
          <UserButton afterSignOutUrl="/" />
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {routes.map((route) => (
                  <DropdownMenuItem key={route.href} asChild>
                    <Link href={route.href}>{route.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}