import HomeMain from "@/components/pages/HomeMain/HomeMain";

export default function Home() {
  return (
    <div>
      <HomeMain />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Fast & Lightweight</h3>
              <p className="text-gray-600 text-sm">Built with performance in mind — minimal bundle size and fast interactions.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">Authentication and role-based access are already scaffolded into the app.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Extensible</h3>
              <p className="text-gray-600 text-sm">Components and pages are designed to be easy to customize and extend.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/auth/sign-up" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-blue-700">Get Started</a>
          </div>
        </div>
      </section>
    </div>
  );
}