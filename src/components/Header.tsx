"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Products", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            href="#"
            className="text-2xl font-bold text-indigo-700 tracking-wide"
            style={{ cursor: "default" }}
          >
            Tesla
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-lg font-medium pb-2 transition-all duration-300
                    ${
                      isActive
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}