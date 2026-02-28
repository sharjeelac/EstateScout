import { Link } from 'react-router-dom'
import { Search, Users, Home, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">
                Find Your Dream Property
              </h1>
              <p className="text-xl mb-8 opacity-90">
                EstateScout connects you with the best properties and experienced real estate agents in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/properties" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Browse Properties
                </Link>
                <Link to="/register" className="btn-outline border-white text-white hover:bg-white hover:text-blue-600">
                  List Your Property
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=500&fit=crop"
                alt="Dream Property"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose EstateScout?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Search className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Search</h3>
              <p className="text-gray-600">
                Find properties using advanced filters and search options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Agents</h3>
              <p className="text-gray-600">
                Connect with verified and experienced real estate professionals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <Home className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse thousands of properties from villas to apartments.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get competitive pricing and exclusive deals from verified sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Find Your New Home?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect property on EstateScout.
          </p>
          <Link to="/properties" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Start Exploring Now
          </Link>
        </div>
      </section>
    </div>
  )
}
