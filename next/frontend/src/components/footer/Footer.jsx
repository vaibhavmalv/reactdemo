import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">YourApp</h3>
            <p className="text-sm mt-2">Making things simple and beautiful.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 w-4/5">
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/about-us" className="hover:underline">About</Link></li>
                <li><Link href="/contact-us" className="hover:underline">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Account</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/auth/login" className="hover:underline">Login</Link></li>
                <li><Link href="/auth/sign-up" className="hover:underline">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Resources</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><Link href="/" className="hover:underline">Blog</Link></li>
                <li><Link href="/" className="hover:underline">Help Center</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-4 text-sm text-gray-400 text-center">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> YourApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
