import { useState, useEffect } from 'react'
import { propertiesAPI } from '../services/api'
import PropertyCard from '../components/PropertyCard'
import { Search, Loader, AlertCircle } from 'lucide-react'

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const { data } = await propertiesAPI.getAll()
      setProperties(data)
      setFilteredProperties(data)
    } catch (err) {
      setError('Failed to fetch properties. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const applyFilters = () => {
    let filtered = properties

    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice))
    }
    if (filters.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    setFilteredProperties(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12">
      <div className="container">
        <h1 className="text-4xl font-bold mb-2">Find Properties</h1>
        <p className="text-gray-600 mb-8">Browse our extensive collection of properties</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Filters */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="studio">Studio</option>
                <option value="townhouse">Townhouse</option>
                <option value="office">Office</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="Min price"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="Max price"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input-field"
                placeholder="Search location..."
              />
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ type: '', minPrice: '', maxPrice: '', location: '' })}
                className="btn-secondary w-full"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader size={40} className="animate-spin text-blue-600" />
          </div>
        ) : filteredProperties.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              Showing {filteredProperties.length} properties
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">
              No properties found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
