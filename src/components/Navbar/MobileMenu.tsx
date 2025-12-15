"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; href: string }>;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-yellow-dark/20 transition-all duration-300 ${
        isOpen
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-4 pointer-events-none invisible"
      }`}
    >
      <div className="flex flex-col p-4 gap-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link key={link.name} href={link.href} onClick={onClose}>
              <button
                className={`w-full text-left py-2 px-4 rounded transition-colors ${
                  isActive
                    ? "bg-yellow-dark/20 text-yellow-light font-bold"
                    : "text-yellow-dark hover:bg-yellow-dark/10"
                }`}
              >
                {link.name}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
