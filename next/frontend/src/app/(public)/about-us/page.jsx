export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 mb-8">We build delightful web experiences that are fast, accessible, and easy to maintain. Our goal is to help teams ship features quickly with delightful UX.</p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600 text-sm">Deliver simple, robust tools that empower teams and users.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-600 text-sm">Quality, Collaboration, and Continuous Improvement.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Our Process</h3>
          <p className="text-gray-600 text-sm">Design-driven development with an emphasis on testing and accessibility.</p>
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-white p-8 rounded-2xl shadow">
        <h3 className="text-2xl font-semibold mb-2">Want to work with us?</h3>
        <p className="text-gray-600 mb-4">Reach out and let’s build something great together.</p>
        <div className="flex justify-center">
          <a href="/contact-us" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-blue-700">Contact Us</a>
        </div>
      </div>
    </div>
  );
}