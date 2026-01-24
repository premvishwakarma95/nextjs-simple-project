"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          MyLogo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/login" className="text-gray-600 hover:text-indigo-600">
            Login
          </Link>
          <Link href="/register" className="text-gray-600 hover:text-indigo-600">
            Register
          </Link>
          <Link
            href="/dashboard"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Toggle Button (SVG) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? (
            /* Close Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Menu Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 space-y-3">
          <Link
            href="/login"
            className="block text-gray-600 hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block text-gray-600 hover:text-indigo-600"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
          <Link
            href="/dashboard"
            className="block bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
