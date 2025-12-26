import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold">YourApp</Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact</Link>
        </nav>

        <div className="ml-auto flex gap-3">
          <Link href="/auth/login" className="px-4 py-2 border rounded hover:bg-gray-100">Login</Link>
          <Link href="/auth/sign-up" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-400">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

