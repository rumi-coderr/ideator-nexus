import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-emerald-400 font-bold text-xl">
              IDEATOR Nexus
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/" className="text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/inventory" className="text-slate-200 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium">
              Inventory
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
