import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-lg" />
          <span className="font-bold text-lg">Maven</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/onboarding" className="text-sm font-medium hover:text-teal-600 transition">
            Get Started
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-teal-600 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}
