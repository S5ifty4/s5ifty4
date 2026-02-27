"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips" },
  { href: "/diy", label: "DIY" },
  { href: "/projects", label: "Projects" },
  { href: "/movies", label: "Movies" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 h-[52px] bg-slate-950 border-b border-slate-800">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-medium text-white">
          S5ifty4
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "text-sky-400 bg-sky-400/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
